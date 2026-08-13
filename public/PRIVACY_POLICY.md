## Lumibot Privacy Policy

**Last Updated:** August 13, 2026

Lumibot is a Discord bot designed to enhance your server experience. This Privacy Policy explains how Lumibot handles your data.

### 1. Data We Collect

Lumibot collects and processes certain information to provide its features. This includes:

*   **Message Content:** To process commands, respond to keywords, and enable features like autoresponders and sticky messages, Lumibot reads the content of messages you send in servers where it is present, and in Direct Messages. This is necessary for the bot to understand and act on your requests.
*   **Server and Channel Information:** Lumibot accesses server (Guild) IDs and channel IDs to manage its features on a per-server basis, such as setting up timed image posts or autoresponders.
*   **User IDs:** Your Discord User ID is collected to manage your interactions with the bot, including linking your account to GitHub for sponsor verification and tracking your reviews.
*   **Timed Interval Settings:** For the feature that sends images at set intervals, Lumibot stores the `channel_id` and interval settings associated with a server.
*   **GitHub Connection Data:** To verify your GitHub sponsorship status, Lumibot stores your Discord User ID, your GitHub ID, and your GitHub username. This data is collected via Discord's OAuth2 authorization flow.
*   **Sponsorship Role Management:** Lumibot checks your roles within a specific server to assign or remove a sponsor role based on your GitHub sponsorship status.
*   **Moderation Commands (Personal Use):** While you mentioned these are for personal use, if any data is logged or stored related to these commands, it would be kept private and not shared.

### 2. How We Use Your Data

The data Lumibot collects is used solely for the following purposes:

*   **Core Bot Functionality:** To send images from `https://minky.materii.dev/`, process commands, manage autoresponders, post sticky messages, and schedule timed image posts.
*   **GitHub Sponsor Verification:** To identify users who are sponsors of the specified GitHub repository and grant them the appropriate role in the designated Discord server.
*   **Personalized Features:** To provide features that are configured on a per-server or per-channel basis (e.g., timed image intervals).
*   **Data Management:** To store and manage bot settings, user preferences, and database integrity.

Lumibot does **not** use any data for advertising purposes.

### 3. Data Storage and Retention

*   **Database:** Lumibot uses a Turso database to store its data. This includes information about autoresponders, timed intervals, sticky messages, plugin reviews, and GitHub connections.
*   **Retention:** Data is stored as long as it is necessary to provide the bot's features or until it is explicitly deleted.
    *   Timed image interval settings can be deleted via a command.
    *   GitHub connections can be unlinked via a command.
    *   Data related to autoresponders, sticky messages, and reviews can also be removed if commands exist for such actions.

### 4. Data Sharing

Lumibot does **not** share your personal data with any third-party services, except for:

*   **Discord API:** Essential for bot operation.
*   **minky.materii.dev API:** Used to fetch image data; no user-specific data is shared.
*   **GitHub API:** Used to verify sponsorship status. This involves checking your associated GitHub ID against a list of active sponsors.
*   **Turso Database:** This is the backend database where your data is stored.

### 5. User Control and Data Deletion

You have control over your data:

*   **Viewing Data:** You can request to see data Lumibot stores about you, such as your GitHub connection details or reviews you've submitted. You may need to use specific bot commands or contact the bot owner.
*   **Deleting Data:**
    *   You can stop timed image sending for a channel, which removes interval settings from the database.
    *   You can unlink your GitHub account, which removes your stored connection data.
    *   If commands exist, you can delete your autoresponders, sticky messages, or reviews.
    *   If you wish to have any other data associated with your account deleted, please contact the bot owner.

### 6. Security

We take reasonable measures to protect the data Lumibot collects. However, no method of transmission over the internet or electronic storage is 100% secure.

### 7. Changes to This Privacy Policy

This Privacy Policy may be updated from time to time. We will notify users of significant changes.

### 8. Contact Information

If you have any questions or concerns about this Privacy Policy or Lumibot's data practices, please contact:

*   **Discord:** l6t9
*   **Email:** lamppliers@gmail.com
