// Sample "Principal's Desk" content, shown until each principal sends their own message.
import type { School } from "../types/school";

export function samplePrincipalMessage(s: School, lang: "en" | "hi" = "en"): string[] {
  if (lang === "hi" && !s.story) {
    return [
      `जोहार! ${s.name} में आपका हार्दिक स्वागत है।`,
      `मुख्यमंत्री उत्कृष्ट विद्यालय के रूप में हमारा लक्ष्य ${s.block} और आसपास के गाँवों के हर बच्चे को अच्छी कक्षाओं, लैब, पुस्तकालय और समर्पित शिक्षकों के साथ मुफ़्त गुणवत्तापूर्ण शिक्षा देना है।`,
      "हम चाहते हैं कि हमारे छात्र पढ़ाई में अच्छा करें और खेल, संस्कृति, अनुशासन और अच्छे संस्कारों में भी आगे बढ़ें। हर बच्चा हमारे लिए महत्वपूर्ण है, और हम कोशिश करते हैं कि कोई भी बच्चा पीछे न छूटे।",
      "अभिभावकों से अनुरोध है कि कक्षा शिक्षकों से संपर्क में रहें, अभिभावक-शिक्षक बैठकों में आएँ और ज़रूरत हो तो कभी भी स्कूल आएँ। साथ मिलकर हम बच्चों का उज्ज्वल भविष्य बना सकते हैं।",
    ];
  }
  if (s.story) {
    return [
      `Johar! A warm welcome to ${s.name}.`,
      `Our school started in ${s.established} with classes 1 to 5 and has grown step by step into a full +2 school, with Intermediate classes since 2017. In 2026 it was selected as a CM School of Excellence, and we are proud to carry this responsibility.`,
      `${s.story.objective} ${s.story.commitment}`,
      "I request parents to stay in touch with the class teachers, attend parent-teacher meetings and visit the school whenever needed. Together we can build a bright future for our children.",
    ];
  }
  return [
    `Johar! A warm welcome to ${s.name}.`,
    `As a CM School of Excellence, our aim is to give every child of ${s.block} and the nearby villages quality education, free of cost, with good classrooms, labs, a library and caring teachers.`,
    "We want our students to do well in studies and also grow in sports, culture, discipline and good values. Every child matters to us, and we work to make sure no child is left behind.",
    "I request parents to stay in touch with the class teachers, attend parent-teacher meetings and visit the school whenever needed. Together we can build a bright future for our children.",
  ];
}

export const PRINCIPAL_PRIORITIES = [
  { icon: "📖", title: "Learning in every class", text: "Strong basics in reading and maths, and regular practice for board classes." },
  { icon: "🛡️", title: "Safe, clean campus", text: "A safe, clean and inclusive school for every girl and boy." },
  { icon: "🏑", title: "Sports & culture", text: "Hockey, football, athletics, music and Jharkhand's folk traditions." },
  { icon: "🤝", title: "Parents as partners", text: "Regular PTMs and open communication with families." },
];
