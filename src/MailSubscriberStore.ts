// Needs a proper database.
class MailSubscriberStore {
  private subscribers = new Map<string, { email: string; subscribed_at: Date }[]>();
  addSubscriber(repoName: string, email: string, cron: unknown) {
    const subscriberToPush = { email, subscribed_at: new Date() };
    const currentSubscribers = this.subscribers.get(repoName);
    if (!currentSubscribers) this.subscribers.set(repoName, [subscriberToPush]);
    else currentSubscribers.push(subscriberToPush);
  },
  // getSubscriber(repoName: string, email: string) {
  //   const repoSubscribers =  this.subscribers.get(repoName);
  //   if(repoSubscribers) return repoSubscribers.includes({email})
  // }
  removeSubscriber(repoName: string, email: string) {
    const currentSubscribers = this.subscribers.get(repoName);
    if (currentSubscribers) throw new Error('Subscription not found');
  }
}
export default MailSubscriberStore;
