import { config } from "../middleware/config.js";
import User from "../models/user.js";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
dotenv.config();
import zoomus from "zoomus";
import { response } from "express";
// Créer un lien de vidéoconférence Google Meet aléatoire
// const createVideoLink = () => {
//   const randomString = Math.random()
//     .toString(36)
//     .substring(2, 2 + config.googleMeet.length);
//   return `${config.googleMeet.baseUrl}${config.googleMeet.prefix}${randomString}`;
// };

const zoom = new zoomus({
  key: process.env.ZOOM_API_KEY,
  secret: process.env.ZOOM_API_SECRET,
});

// Créer une réunion et envoyer un e-mail avec le lien d'invitation
const createZoomMeeting = (clientEmail) => {
  // Créer la réunion
  zoom.meeting.create(
    {
      topic: "Entrevue avec un client",
      type: 2,
      start_time: new Date().toISOString(),
      duration: 60,
      settings: {
        join_before_host: true,
      },
    },
    (err, res) => {
      if (err) {
        console.log(err);
      } else {
        console.log(res);

        // Envoyer un e-mail avec le lien d'invitation
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "gharbi.wided@esprit.tn",
            pass: "cdrzdbqyiwomudjj",
          },
        });

        const mailOptions = {
          from: "gharbi.wided@esprit.tn",
          to: clientEmail,
          subject: "Invitation à une réunion Zoom",
          text: "Voici le lien pour rejoindre la réunion : " + res.join_url,
        };

        transporter.sendMail(mailOptions, (err, info) => {
          if (err) {
            console.log(err);
          } else {
            console.log("E-mail envoyé: " + info.response);
          }
        });
      }
    }
  );
};

// Créer une réunion
// zoom.meeting.create({
//     topic: 'Réunion Dynamique',
//     type: 2,
//     start_time: new Date().toISOString(),
//     duration: 60,
//     settings: {
//       join_before_host: true
//     }
//   },
//   (err, res) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log(res);

//       // Démarrer la réunion
//       zoom.meeting.start({
//         id: res.id
//       }, (err, res) => {
//         if (err) {
//           console.log(err);
//         } else {
//           console.log(res);
//         }
//       });
//     }
//   });

// Envoyer un courriel de confirmation avec le lien de vidéoconférence
// const sendEmail = async (to, videoLink) => {
//   const transporter = nodemailer.createTransport({
//     service: "gmail",
//     auth: {
//       user: "mariem.khadhraoui@esprit.tn",
//       pass: "224AFT0342",
//     },
//   });

//   const mailOptions = {
//     from: "mariem.khadhraoui@esprit.tn",
//     to,
//     subject: "Confirmation of Video Interview",
//     html: `<p>Dear candidate, please join the video interview using the following link:</p><a href="${videoLink}">${videoLink}</a>`,
//   };

//   await transporter.sendMail(mailOptions);
// };

// Send an interview link to an existing user
// export const createUserInterview = async (req, res) => {
//   const { name, email } = req.body;

//   try {
//     // Find the user by their email
//     const user = await User.findOne({ email });

//     // If the user does not exist, return an error message
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Generate a new video link
//     const videoLink = createVideoLink();

//     // Update the user with the new video link
//     user.videoLink = videoLink;
//     await user.save();

//     // Send an email to the user with the video link

//     const transporter = nodemailer.createTransport({
//       service: "gmail",
//       auth: {
//         user: "gharbi.wided@esprit.tn",
//         pass: "cdrzdbqyiwomudjj",
//       },
//     });

//     const mailOptions = {
//       from: "gharbi.wided@esprit.tn",
//       to: user.email,
//       subject: "Confirmation of Video Interview",
//       html: `<p>Dear candidate, please join the video interview using the following link:</p><a href="${videoLink}">${videoLink}</a>`,
//     };

//     await transporter.sendMail(mailOptions);

//     res.status(200).json({ message: "Interview link sent" });
//   } catch (error) {
//     console.error(error.message);
//     res.status(500).json({ message: "Server error" });
//   }
// };



export const createVideoLink = async () => {
    try {
      const response = await fetch('https://quickrecruiter.daily.co/PI', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'd97168dad1971bfdbbe8a364567f1e017263ce8365ba59be89170a62ee6cc0a5'
        },
     

        body: JSON.stringify({properties: {max_participants: 2}})
      });
      console.log(response);
      const data = await response.json();
      return data.url;
    } catch (error) {
      console.error(error);
      return null;
    }
  };
  
  export const createUserInterview = async (req, res) => {
    const { name, email } = req.body;
  
    try {
      // Find the user by their email
      const user = await User.findOne({ email });
  
      // If the user does not exist, return an error message
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }
  
      // Generate a new video link
      const videoLink = await createVideoLink();
  
      // Update the user with the new video link
      user.videoLink = videoLink;
      await user.save();
  
      // Send an email to the user with the video link
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "gharbi.wided@esprit.tn",
          pass: "cdrzdbqyiwomudjj",
        },
      });
  
      const mailOptions = {
        from: "gharbi.wided@esprit.tn",
        to: user.email,
        subject: "Confirmation of Video Interview",
        html: `<p>Dear candidate, please join the video interview using the following link:</p><a href="${videoLink}">${videoLink}</a>`,
      };
  
      await transporter.sendMail(mailOptions);
  
      res.status(200).json({ message: "Interview link sent" });
    } catch (error) {
      console.error(error.message);
      res.status(500).json({ message: "Server error" });
    }
  };
  