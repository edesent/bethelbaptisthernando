// Sermon Library — per-church configuration.
// Shipped with Westview Baptist Church's values as a working example.
// Replace every field for the church you're installing on.

export const sermonLibraryConfig = {
  // The church's YouTube CHANNEL ID (starts with "UC…", not the @handle).
  // Find it at youtube.com → the channel page → View page source → search "channelId",
  // or https://www.youtube.com/account_advanced while signed in as the church.
  youtubeChannelId: "UCglzfKXDoCYaCXwooQNAPpA",

  // Public link to the channel — used by the "watch on YouTube" fallback button
  // when the channel has no videos yet.
  youtubeUrl: "https://www.youtube.com/@WestviewBaptistChurch",

  // How many recent messages to show in the grid.
  limit: 12,
};
