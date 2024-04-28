export default async function GetFeaturedTutorials() {
  // return [
  //   {
  //     id: 1,
  //     img_url:
  //       "https://images.pexels.com/photos/1431282/pexels-photo-1431282.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     name: "Body Sculpting",
  //     time: "15 minutes",
  //   },
  //   {
  //     id: 2,
  //     img_url:
  //       "https://images.pexels.com/photos/28076/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     name: "Slender Legs",
  //     time: "10 minutes",
  //   },
  //   {
  //     id: 3,
  //     img_url:
  //       "https://images.pexels.com/photos/2294361/pexels-photo-2294361.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     name: "Core Strength",
  //     time: "20 minutes",
  //   },
  //   {
  //     id: 4,
  //     img_url:
  //       "https://images.pexels.com/photos/1229356/pexels-photo-1229356.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  //     name: "Upper Body Workout",
  //     time: "25 minutes",
  //   },
  // ];

  return fetch(
    `https://fitbuddy-middleware-database.vercel.app/api/getFeaturedTutorials`,
    {
      method: "GET",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    }
  );
}
