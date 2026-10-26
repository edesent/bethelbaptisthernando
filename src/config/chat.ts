// Live chat + form delivery (Website Chat, the Slack-backed chat Pastor Eli runs).
//
// One connection powers two things: the chat bubble in the corner of every page,
// and every form on the site (the ride request, prayer, contact). Both land in
// the church's Slack channel, so a message reaches the pastor's phone in seconds.
//
// The key identifies this site to the chat backend. It only permits posting into
// this church's own channel — it can't read anything — so it lives in the repo
// rather than in an env var, which keeps previews and local dev working.
// Backend site id: 84791e07-ae1f-44f6-b9e4-90e7d79a6549.

export const CHAT = {
  origin: "https://slackwebsitechat.vercel.app",
  apiKey: "wbc_24059ab7fa7f5feab79c2d0134564d4456d49e6511a4c742",
  accentColor: "#b8891c",
  brandColor: "#2f2824",
  /** Pastor Bankert's face, so visitors see they are writing to a person. */
  agentIcon: "/photos/pastor-face.jpg",
  greeting: "Thinking about visiting? I’m Pastor Brandon. Ask me anything, I’ll answer myself.",
  formSubtitle: "Leave your name and a number or email and Pastor Brandon will get back to you.",
} as const;
