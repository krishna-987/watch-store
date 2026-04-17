// ❌ REMOVE THIS LINE
// import { type } from "@testing-library/user-event/dist/type";

const stories = [
  {
    id: 1,
    title: 'MEET THE NEW T2/04 "T-ART"',
    date: "Dec 17, 2021",
    desc: "The T2-04 harks back to a time of fine craftsmanship & modern styles...",
    image: "/images/story1.webp",

    extraImages: [
      {
        img: "/images/story8.webp",
        text: "The Art Deco style is carried further..."
      },
      {
        img: "/images/story9.webp",
        text: "The stainless-steel case carries the sobriety..."
      },
      {
        img: "/images/story10.webp",
        text: "Challenge the norm, bring glamour..."
      }
    ]
  },

  {
    id: 2,
    title: "SEVENFRIDAY T2/01 WATCH REVIEW - TIMEKEEPERS EP7",
    image: "/images/story2.webp",
    date: "Dec 17, 2021",

    sections: [
      {
        type: "text",
        content: "Celebrating the SEVENFRIDAY attitude..."
      },
      {
        type: "video",
        src: "https://www.youtube.com/embed/gkWhl9jY224"
      },
      {
        type: "text",
        content: "The T-Series is smaller, thinner..."
      }
    ]
  },

  {
    id: 3,
    title: "SEVENFRIDAY X MICAH'S VOICE - LETTER FROM SHAWN STOCKMAN",
    date: "Jul 02, 2021",
    image: "/images/story3.webp",

    sections: [
      {
        type: "text",
        content: "LOS ANGELES, 2021.06.14 Let’s face it..."
      },
      {
        type: "image",
        src: "/images/story11.webp"
      },
      {
        type: "text",
        content: "Let’s face it, life is hard. It can be depressing, it can be daunting, and it can just downright suck! We experience new challenges every single day, some of which are much harder to face than others. But it’s those same challenges that bring out the absolute best in us, and reveals exactly why life is worth living. Haven’t you noticed that the smiles you experience are much sweeter after a trial you passed? Life is all about accumulating as many types of smiles you can, and for many reasons. Autism has been THE most challenging thing I have ever faced! But with each small step forward, and every tiny victory, there leaves a remnant of accomplishment and a feeling of worth and purpose. So in honour of the GOOD times, and the BEAUTIFUL moments, and the DEFINING goals we all achieve, my friend Dan Niederer and I created something that we hope makes you smile as much as it makes us smile! We are proud to present the LIMITED edition SEVENFRIDAY MICAH’S VOICE T1/02. Proceeds of these timepieces go to “Micah’s Voice”, a charity my wife Sharhonda and I created to provide hope and resources for families that are eected by autism. We hope that with the purchase of your times piece, you feel a sense of pride and the urge to smile every time you look down and see the watch smiling right back at you! Life is hard, but it sure is nice to know that there are others on this earth that are willing and able to help make life, just a little better!"
      },
      {
        type: "image",
        src: "/images/story12.webp"
      },
      {
        type: "text",
        content: "Peace and love!Shawn Stockman"
      }
    ]
  }   // ✅ CLOSED OBJECT

];     // ✅ CLOSED ARRAY

export default stories;