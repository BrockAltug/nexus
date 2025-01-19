const db = require('../config/connection');
const { User, Post, Message } = require('../models');
const userSeeds = require('./userSeeds.json');
const postSeeds = require('./postSeeds.json');
const messageSeeds = require('./messageSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    console.log('Starting database cleanup...');
    // Clean database collections
    await cleanDB('Post', 'posts');
    await cleanDB('Message', 'messages');
    await cleanDB('User', 'users');
    console.log('Database cleanup completed.');

    // Seed users and map usernames to IDs
    console.log('Seeding users...');
    const users = await User.create(userSeeds);
    const userMap = users.reduce((map, user) => {
      map[user.username] = user._id;
      return map;
    }, {});
    console.log('Users seeded successfully.');

    // Seed posts and associate them with users
    console.log('Seeding posts...');
    for (const postSeed of postSeeds) {
      const { postAuthor, ...postData } = postSeed;
      if (!userMap[postAuthor]) {
        throw new Error(`User "${postAuthor}" not found. Check your postSeeds.json.`);
      }

      const post = await Post.create({ ...postData, postAuthor });
      await User.findOneAndUpdate(
        { _id: userMap[postAuthor] },
        { $addToSet: { posts: post._id } }
      );
    }
    console.log('Posts seeded successfully.');

    // Seed messages and associate them with sender and recipient users
    console.log('Seeding messages...');
    for (const messageSeed of messageSeeds) {
      const { sender, recipient, ...messageData } = messageSeed;
      if (!userMap[sender]) {
        throw new Error(`Sender "${sender}" not found. Check your messageSeeds.json.`);
      }
      if (!userMap[recipient]) {
        throw new Error(`Recipient "${recipient}" not found. Check your messageSeeds.json.`);
      }

      const message = await Message.create({
        ...messageData,
        sender: userMap[sender],
        recipient: userMap[recipient],
      });

      await User.findOneAndUpdate(
        { _id: userMap[sender] },
        { $addToSet: { messages: message._id } }
      );

      await User.findOneAndUpdate(
        { _id: userMap[recipient] },
        { $addToSet: { messages: message._id } }
      );
    }
    console.log('Messages seeded successfully.');
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }

  console.log('All done!');
  process.exit(0);
});