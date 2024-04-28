export default async function GetTutorialDetail(id) {
  // return {
  //   id: 1,
  //   img_url:
  //     "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //   name: "Body Sculpting",
  //   time: "15 minutes",
  //   description:
  //     "A high-intensity workout targeting multiple muscle groups to tone, strengthen, and define your body.",
  //   exercise: [
  //     {
  //       name: "Push-ups",
  //       reps: "15",
  //       description:
  //         "Start in a plank position with your hands slightly wider than shoulder-width apart. Lower your body until your chest nearly touches the floor, then push yourself back up to the starting position.",
  //     },
  //     {
  //       name: "Squats",
  //       reps: "20",
  //       description:
  //         "Stand with your feet shoulder-width apart. Bend your knees and lower your hips as if you're sitting back into a chair. Keep your chest up and your core engaged. Push through your heels to return to the starting position.",
  //     },
  //     {
  //       name: "Plank",
  //       duration: "1 minute",
  //       description:
  //         "Start in a push-up position with your hands directly under your shoulders. Hold your body in a straight line from head to heels, engaging your core and keeping your glutes tight. Hold for the specified duration.",
  //     },
  //     {
  //       name: "Lunges",
  //       reps: "12 each leg",
  //       description:
  //         "Stand tall with your feet hip-width apart. Step forward with one leg, lowering your hips until both knees are bent at about a 90-degree angle. Push back up to the starting position and repeat on the other leg.",
  //     },
  //     {
  //       name: "Dumbbell Rows",
  //       reps: "12 each arm",
  //       description:
  //         "Hold a dumbbell in one hand, hinge forward at the hips, and place your opposite hand on a bench or sturdy surface for support. Pull the dumbbell up towards your ribcage, keeping your elbow close to your body. Lower the dumbbell back down and repeat on the other side.",
  //     },
  //   ],
  // };

  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/getTutorialDetail?tutorial_id=${id}`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
