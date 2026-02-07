export interface InfraMailbox {
  id: string;
  email: string;
  provider: "outlook" | "google";
  sendingVolumeCurrent: number;
  sendingVolumeMax: number;
  replyRate: number;
  bounceRate: number;
  warmupDays: number;
  warmupPercent: number;
}

export interface InfraDomain {
  domain: string;
  mailboxes: InfraMailbox[];
}

export const infrastructureDomains: InfraDomain[] = [
  {
    domain: "podcastsadd.com",
    mailboxes: [
      { id: "1", email: "a_shafik@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0, bounceRate: 8.3, warmupDays: 42, warmupPercent: 97 },
      { id: "2", email: "b_miller@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.1, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "3", email: "c_johnson@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.5, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "4", email: "d_williams@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.8, bounceRate: 0, warmupDays: 38, warmupPercent: 95 },
      { id: "5", email: "e_brown@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.2, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "6", email: "f_davis@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0.9, bounceRate: 0, warmupDays: 40, warmupPercent: 98 },
      { id: "7", email: "g_garcia@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 5.1, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "8", email: "h_martinez@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.7, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "9", email: "i_anderson@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0, bounceRate: 0, warmupDays: 35, warmupPercent: 88 },
      { id: "10", email: "j_thomas@podcastsadd.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.4, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
    ],
  },
  {
    domain: "outreachflow.io",
    mailboxes: [
      { id: "11", email: "alex@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.8, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "12", email: "beth@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.2, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "13", email: "carlos@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.9, bounceRate: 0, warmupDays: 40, warmupPercent: 98 },
      { id: "14", email: "diana@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.5, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "15", email: "ethan@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 5.6, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "16", email: "fiona@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0.8, bounceRate: 0, warmupDays: 36, warmupPercent: 92 },
      { id: "17", email: "greg@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.1, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "18", email: "hannah@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.3, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "19", email: "ivan@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.7, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "20", email: "julia@outreachflow.io", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.9, bounceRate: 0, warmupDays: 39, warmupPercent: 96 },
    ],
  },
  {
    domain: "coldpipeline.co",
    mailboxes: [
      { id: "21", email: "mark@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 6.2, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "22", email: "natalie@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.4, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "23", email: "oliver@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.1, bounceRate: 0, warmupDays: 38, warmupPercent: 94 },
      { id: "24", email: "patricia@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.8, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "25", email: "quinn@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.3, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "26", email: "rachel@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0, bounceRate: 0, warmupDays: 30, warmupPercent: 82 },
      { id: "27", email: "sam@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 5.5, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "28", email: "tara@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.8, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "29", email: "ulrich@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.9, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "30", email: "vera@coldpipeline.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.7, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
    ],
  },
  {
    domain: "replyengine.net",
    mailboxes: [
      { id: "31", email: "will@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.4, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "32", email: "xena@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.6, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "33", email: "yuki@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.1, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "34", email: "zara@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.3, bounceRate: 0, warmupDays: 40, warmupPercent: 97 },
      { id: "35", email: "adam@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0.6, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "36", email: "bella@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 5.8, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "37", email: "chris@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.0, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "38", email: "debra@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.3, bounceRate: 0, warmupDays: 38, warmupPercent: 93 },
      { id: "39", email: "eliot@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 7.1, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "40", email: "freya@replyengine.net", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.9, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
    ],
  },
  {
    domain: "meetingmakers.com",
    mailboxes: [
      { id: "41", email: "gabe@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.0, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "42", email: "hope@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.5, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "43", email: "ian@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.2, bounceRate: 0, warmupDays: 34, warmupPercent: 86 },
      { id: "44", email: "jasmine@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.7, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "45", email: "kyle@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 6.0, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "46", email: "luna@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0.4, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "47", email: "mason@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.9, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "48", email: "nina@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.6, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "49", email: "oscar@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.8, bounceRate: 0, warmupDays: 39, warmupPercent: 95 },
      { id: "50", email: "penny@meetingmakers.com", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.5, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
    ],
  },
  {
    domain: "inboxwarmer.co",
    mailboxes: [
      { id: "51", email: "reed@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.2, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "52", email: "sophie@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 5.3, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "53", email: "tony@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0, bounceRate: 0, warmupDays: 28, warmupPercent: 78 },
      { id: "54", email: "uma@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.0, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "55", email: "victor@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.4, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "56", email: "wendy@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 1.6, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "57", email: "xavier@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.8, bounceRate: 0, warmupDays: 41, warmupPercent: 99 },
      { id: "58", email: "yolanda@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 6.7, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "59", email: "zack@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 0.3, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "60", email: "alice@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 3.8, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "61", email: "bob@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 2.1, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
      { id: "62", email: "carol@inboxwarmer.co", provider: "outlook", sendingVolumeCurrent: 5, sendingVolumeMax: 5, replyRate: 4.9, bounceRate: 0, warmupDays: 42, warmupPercent: 100 },
    ],
  },
];

// Aggregation helpers
export function getDomainAggregate(domain: InfraDomain) {
  const mailboxes = domain.mailboxes;
  const totalCurrent = mailboxes.reduce((sum, m) => sum + m.sendingVolumeCurrent, 0);
  const totalMax = mailboxes.reduce((sum, m) => sum + m.sendingVolumeMax, 0);

  // Weighted averages by sending volume
  const totalVolume = mailboxes.reduce((sum, m) => sum + m.sendingVolumeCurrent, 0);
  const weightedReply = totalVolume > 0
    ? mailboxes.reduce((sum, m) => sum + m.replyRate * m.sendingVolumeCurrent, 0) / totalVolume
    : 0;
  const weightedBounce = totalVolume > 0
    ? mailboxes.reduce((sum, m) => sum + m.bounceRate * m.sendingVolumeCurrent, 0) / totalVolume
    : 0;

  const avgWarmupDays = Math.round(mailboxes.reduce((sum, m) => sum + m.warmupDays, 0) / mailboxes.length);
  const avgWarmupPercent = Math.round(mailboxes.reduce((sum, m) => sum + m.warmupPercent, 0) / mailboxes.length);

  return {
    sendingVolumeCurrent: totalCurrent,
    sendingVolumeMax: totalMax,
    replyRate: Math.round(weightedReply * 10) / 10,
    bounceRate: Math.round(weightedBounce * 10) / 10,
    warmupDays: avgWarmupDays,
    warmupPercent: avgWarmupPercent,
  };
}

export function getGlobalStats(domains: InfraDomain[]) {
  const allMailboxes = domains.flatMap((d) => d.mailboxes);
  const totalAccounts = allMailboxes.length;
  const totalDomains = domains.length;
  const dailyCapacity = allMailboxes.reduce((sum, m) => sum + m.sendingVolumeMax, 0);

  const outlookCount = allMailboxes.filter((m) => m.provider === "outlook").length;
  const googleCount = allMailboxes.filter((m) => m.provider === "google").length;
  const outlookPct = totalAccounts > 0 ? Math.round((outlookCount / totalAccounts) * 100) : 0;
  const googlePct = totalAccounts > 0 ? Math.round((googleCount / totalAccounts) * 100) : 0;

  const totalVolume = allMailboxes.reduce((sum, m) => sum + m.sendingVolumeCurrent, 0);
  const avgReplyRate = totalVolume > 0
    ? Math.round((allMailboxes.reduce((sum, m) => sum + m.replyRate * m.sendingVolumeCurrent, 0) / totalVolume) * 10) / 10
    : 0;
  const avgBounceRate = totalVolume > 0
    ? Math.round((allMailboxes.reduce((sum, m) => sum + m.bounceRate * m.sendingVolumeCurrent, 0) / totalVolume) * 10) / 10
    : 0;
  const avgWarmupHealth = Math.round(allMailboxes.reduce((sum, m) => sum + m.warmupPercent, 0) / totalAccounts);

  return {
    totalAccounts,
    totalDomains,
    dailyCapacity,
    outlookPct,
    googlePct,
    avgReplyRate,
    avgBounceRate,
    avgWarmupHealth,
  };
}
