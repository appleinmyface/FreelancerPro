const mongoose = require('mongoose');
const User = require('./models/User'); 
const Service = require('./models/Service');
const Review = require('./models/Review');
require('dotenv').config({ path: './.env'});

const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('MongoDB connected...');
        seedDatabase();
    })
    .catch(err => console.log('Error connecting to MongoDB:', err));

async function seedDatabase() {
    try {
        // Clear existing data
        await User.deleteMany({});
        await Service.deleteMany({});
        await Review.deleteMany({});

        // Create 20 users
        const users = await User.insertMany([
            { username: 'user1', email: 'user1@example.com', password: 'password1' },
            { username: 'user2', email: 'user2@example.com', password: 'password2' },
            { username: 'user3', email: 'user3@example.com', password: 'password3' },
            { username: 'user4', email: 'user4@example.com', password: 'password4' },
            { username: 'JohnDoe', email: 'johndoe@email.com', password: 'password' },
            { username: 'JaneSmith', email: 'janesmith@email.com', password: 'password3' },
            { username: 'AliceJones', email: 'alicejones@email.com', password: 'password4' },
            { username: 'TomHardy', email: 'tomhardy@email.com', password: 'password5' },
            { username: 'ChrisEvans', email: 'chrisevans@email.com', password: 'password6' },
            { username: 'EmmaStone', email: 'emmastone@email.com', password: 'password7' },
            { username: 'NataliePortman', email: 'natalie@email.com', password: 'password8' },
            { username: 'TomHolland', email: 'tomholland@email.com', password: 'password9' },
            { username: 'RobertDowney', email: 'robertdowney@email.com', password: 'password10' },
            { username: 'ScarlettJohansson', email: 'scarlett@email.com', password: 'password11' },
            { username: 'RyanReynolds', email: 'ryanreynolds@email.com', password: 'password12' },
            { username: 'HughJackman', email: 'hughjackman@email.com', password: 'password13' },
            { username: 'GalGadot', email: 'galgadot@email.com', password: 'password14' },
            { username: 'Zendaya', email: 'zendaya@email.com', password: 'password15' },
            { username: 'MargotRobbie', email: 'margotrobbie@email.com', password: 'password16' },
            { username: 'HenryCavill', email: 'henrycavill@email.com', password: 'password17' }
        ]);
        console.log('Users seeded.');

        // Create 20 services
        const services = await Service.insertMany([
            { title: 'Web Development', description: 'Build a responsive website.', price: 300, createdBy: users[0]._id },
            { title: 'Graphic Design', description: 'Create stunning graphics and logos.', price: 150, createdBy: users[1]._id },
            { title: 'SEO Optimization', description: 'Improve your website ranking on search engines.', price: 200, createdBy: users[2]._id },
            { title: 'Content Writing', description: 'Write engaging and high-quality content.', price: 100, createdBy: users[3]._id },
            { title: 'Digital Marketing', description: 'Promote your business online effectively.', price: 250, createdBy: users[4]._id },
            { title: 'App Development', description: 'Create mobile apps for both Android and iOS.', price: 500, createdBy: users[5]._id },
            { title: 'Video Editing', description: 'Edit professional videos for your project.', price: 300, createdBy: users[6]._id },
            { title: 'Social Media Management', description: 'Manage and grow your social media presence.', price: 150, createdBy: users[7]._id },
            { title: 'Photography', description: 'Capture stunning photos for your portfolio or event.', price: 200, createdBy: users[8]._id },
            { title: 'Translation Services', description: 'Translate documents between multiple languages.', price: 120, createdBy: users[9]._id },
            { title: 'Voice Over', description: 'Professional voice over services.', price: 180, createdBy: users[10]._id },
            { title: '3D Modeling', description: 'Create detailed 3D models for your project.', price: 400, createdBy: users[11]._id },
            { title: 'UX/UI Design', description: 'Design intuitive user experiences and interfaces.', price: 350, createdBy: users[12]._id },
            { title: 'Animation', description: 'Create smooth and professional animations.', price: 450, createdBy: users[13]._id },
            { title: 'Copywriting', description: 'Write engaging and persuasive copy.', price: 90, createdBy: users[14]._id },
            { title: 'Game Development', description: 'Develop a game for desktop or mobile.', price: 600, createdBy: users[15]._id },
            { title: 'Data Analysis', description: 'Analyze data and provide reports.', price: 220, createdBy: users[16]._id },
            { title: 'Music Production', description: 'Produce high-quality music for your project.', price: 500, createdBy: users[17]._id },
            { title: 'Public Relations', description: 'Manage your public relations and outreach.', price: 300, createdBy: users[18]._id },
            { title: 'Event Planning', description: 'Plan and execute events professionally.', price: 400, createdBy: users[19]._id },
        ]);
        console.log('Services seeded.');

        // Create 20 reviews
        const reviews = await Review.insertMany([
            { comment: 'Excellent service!', rating: 5, postedBy: users[1]._id, serviceID: services[0]._id },
            { comment: 'Very satisfied!', rating: 4, postedBy: users[2]._id, serviceID: services[1]._id },
            { comment: 'Great results!', rating: 5, postedBy: users[3]._id, serviceID: services[2]._id },
            { comment: 'Highly recommend!', rating: 5, postedBy: users[4]._id, serviceID: services[3]._id },
            { comment: 'Professional and efficient.', rating: 4, postedBy: users[5]._id, serviceID: services[4]._id },
            { comment: 'Awesome experience.', rating: 5, postedBy: users[6]._id, serviceID: services[5]._id },
            { comment: 'Very reliable.', rating: 4, postedBy: users[7]._id, serviceID: services[6]._id },
            { comment: 'The service was top-notch.', rating: 5, postedBy: users[8]._id, serviceID: services[7]._id },
            { comment: 'Great communication!', rating: 4, postedBy: users[9]._id, serviceID: services[8]._id },
            { comment: 'Quick turnaround time.', rating: 5, postedBy: users[10]._id, serviceID: services[9]._id },
            { comment: 'Very professional.', rating: 4, postedBy: users[11]._id, serviceID: services[10]._id },
            { comment: 'Would definitely hire again.', rating: 5, postedBy: users[12]._id, serviceID: services[11]._id },
            { comment: 'Exceeded expectations.', rating: 5, postedBy: users[13]._id, serviceID: services[12]._id },
            { comment: 'High-quality work.', rating: 5, postedBy: users[14]._id, serviceID: services[13]._id },
            { comment: 'Very accommodating.', rating: 4, postedBy: users[15]._id, serviceID: services[14]._id },
            { comment: 'Delivered on time.', rating: 5, postedBy: users[16]._id, serviceID: services[15]._id },
            { comment: 'Creative and skilled.', rating: 5, postedBy: users[17]._id, serviceID: services[16]._id },
            { comment: 'Great attention to detail.', rating: 4, postedBy: users[18]._id, serviceID: services[17]._id },
            { comment: 'Very easy to work with.', rating: 5, postedBy: users[19]._id, serviceID: services[18]._id },
            { comment: 'Fantastic service!', rating: 5, postedBy: users[0]._id, serviceID: services[19]._id },
        ]);
        console.log('Reviews seeded.');

        // Close the connection
        mongoose.connection.close();
    } catch (error) {
        console.error('Error seeding data:', error);
        mongoose.connection.close();
    }
}
