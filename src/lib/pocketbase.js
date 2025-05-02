import PocketBase from 'pocketbase';

// Create PocketBase instance only on client side
const getPocketBase = () => {
  if (typeof window === "undefined") return null;
  return new PocketBase('https://conference.pockethost.io');
};

export const pb = getPocketBase();

// export const committeeService = {
//   async getAll() {
//     try {
//       if (!pb) throw new Error('PocketBase not initialized');
//       return await pb.collection('committee').getFullList({
//         sort: '-created',
//         requestKey: null,
//       });
//     } catch (error) {
//       console.error('Error fetching committees:', error);
//       throw error;
//     }
//   }
// };

// export const speakersService = {
//     async getAll() {
//       try {
//         if (!pb) throw new Error('PocketBase not initialized');
//         const records = await pb.collection('speakers').getFullList({
//           sort: '-created',
//         });
  
//         // Group speakers by category
//         const groupedSpeakers = records.reduce((acc, speaker) => {
//           if (!acc[speaker.category]) {
//             acc[speaker.category] = [];
//           }
//           acc[speaker.category].push(speaker);
//           return acc;
//         }, {});
  
//         return groupedSpeakers;
//       } catch (error) {
//         console.error('Error fetching speakers:', error);
//         throw error;
//       }
//     }
//   };