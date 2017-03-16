User.destroy_all

def own_posts(user, text_array)
  text_array.reverse.each do |post|
    Post.create!(wall_id: user.id, author_id: user.id, body: post)
  end
end

def add_profile_pics(user)
  user.avatar = "https://s3.amazonaws.com/oopbook/seeds/#{user.fname.downcase}/avatar.jpg"
  user.cover = "https://s3.amazonaws.com/oopbook/seeds/#{user.fname.downcase}/cover.jpg"
  user.save!
end

def create_friendship(user_one, user_two)
  Friendship.create!(user_id: user_one.id, friend_id: user_two.id, completed: true)
  Friendship.create!(friend_id: user_one.id, user_id: user_two.id, completed: true)
end

def add_photos(user, num)
  (1..num).each do |i|
    photo = Photo.create!(
      image: "https://s3.amazonaws.com/oopbook/seeds/#{user.fname.downcase}/photos/#{i}.jpg",
      user_id: user.id)
    # post = Post.find_by('body ILIKE ?', '%ivanka%')
    # post.content = photo
    # post.save!
  end
end

# ---- DONALD TRUMP
# mark = User.first
mark = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Mark", lname: "Zuckerberg", email: "mark@facebook.com", password: "password")
donald = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Donald", lname: "Trump", email: "donald@whitehouse.gov", password: "tinyhands", intro: "Nobody knows how to run a country better than me. Believe me. I know the best people. We're going to MAKE AMERICA GREAT AGAIN.")
sean = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Sean", lname: "Spicer", email: "sean@whitehouse.gov", password: "password", intro: "Speaking for a nation.")
hillary = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Hillary", lname: "Clinton", email: "hillary@privateemailserver.gov", password: "password", intro: "Hillary Clinton is an American politician who was the 67th United States Secretary of State.")
matthew = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Matthew", lname: "McConaughey", email: "matthew@gmail.com", password: "password", intro: "Oscar winner.")
jennifer = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Jennifer", lname: "Lawrence", email: "jennny@gmail.com", password: "password", intro: "Actress.")
taylor = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Taylor", lname: "Swift", email: "tswift@gmail.com", password: "password", intro: "Singer.")


bill = User.create!(last_fetch_time: 5.days.ago, last_friend_fetch: 5.days.ago, last_message_fetch: 5.days.ago, fname: "Bill", lname: "Gates", email: "bill@gmail.com", password: "password", intro: "William Henry 'Bill' Gates III is an American business magnate, investor, author, and philanthropist. In 1975, Gates and Paul Allen co-founded Microsoft, which became the world's largest PC software company.")


add_photos(bill, 8)
add_photos(mark, 6)

bill_own_posts = [
  "People ask us all the time how they can help in the fight against child mortality–and we are always proud to recommend making a donation to UNICEF, an organization that is successful at serving families and children worldwide. We hope your gift will help inspire others to get involved as well. https://www.unicef.org/gatesletter/?utm_source=social&utm_campaign=gates_letter&utm_medium=social_gates",
  "I've always admired doctors. They have to make impossibly hard decisions, and so much of their work has life-and-death implications.
This book, written by a young surgeon with terminal cancer, earned my admiration—and tears: http://b-gat.es/2myT4wr"]

donald_own_posts = ["MAKE AMERICA GREAT AGAIN",
  "The FBI is totally unable to stop the national security 'leakers' that have permeated our government for a long time.
They can't even find the leakers within the FBI itself. Classified information is being given to media that could have a devastating effect on U.S. FIND NOW",
"BUILD THAT WALL http://www.breitbart.com/big-government/2017/02/23/report-religious-leaders-creating-underground-railroad-to-hide-illegal-aliens/",
"Heading to Joint Base Andrews on #MarineOne with Prime Minister Shinzō earlier today.",
"Seven people shot and killed yesterday in Chicago. What is going on there - totally out of control. Chicago needs help!",
"CONFIDENTIAL NUCLEAR FOOTBALL CODE: 3AASJKS8234278942ACS",
"MAKE AMERICA GREAT AGAIN",
"ON THIS DAY...
Raising the Flag on Iwo Jima is a photograph taken on February 23, 1945, by Joe Rosenthal. It depicts six United States Marines raising a U.S. flag atop Mount Suribachi, during the Battle of Iwo Jima in World War II....https://en.m.wikipedia.org/wiki/Raising_the_Flag_on_Iwo_Jima",
"#Repost Ivanka Trump via Instagram:
・・・
Arabella and I visited the Supreme Court this morning and attended a hearing. I'm grateful for the opportunity to teach her about the judicial system in our country firsthand. #SCOTUS #SupremeCourt #ImportantLessons #MotherDaughter",
"No more wasted money! We must do a lot more with less, and look for every last dollar of savings. Unfortunately, the budget that we’re essentially inheriting, is a mess. The finances of our country are a mess - with the national debt at $20 TRILLION (doubling over the last eight years.)
Washington cannot ignore this - we need to address it immediatley, and that's exactly what we are going to do!",
"The so-called angry crowds in home districts of some Republicans are actually, in numerous cases, planned out by liberal activists. Sad!",
"MAKE AMERICA GREAT AGAIN."]
# own_posts(donald, donald_own_posts)


sean_own_posts = ["You nailed it. Period! https://twitter.com/TheOnion/status/825546280034201600",
"Inauguration Day: @realDonaldTrump to become America's 45th president
@AP
http://bigstory.ap.org/article/c0a8b0d6a3244d7cbcb6dd294232fb56/inauguration-day-trump-become-americas-45th-president … #Inauguration #DonaldTrumpInauguration",
"password12",
]
# own_posts(donald, sean_own_posts)

naz_own_posts = ["Love this tune https://www.youtube.com/watch?v=qfY4jJYeTes&feature=share",
"Having a great time at app academy"]


hillary_own_posts = ["Before this year ends, I want to thank you again for your support of our campaign. While we didn't achieve the outcome we sought, I'm proud of the vision and values we fought for and the nearly 66 million people who voted for them.
I believe it is our responsibility to keep doing our part to build a better, stronger, and fairer future for our country and the world.
The holidays are a time to be thankful for our blessings. So let us rejoice in this season and look forward with renewed hope and determination.
I wish you and your family health, happiness, and continued strength for the New Year and the work ahead. I look forward to staying in touch in 2017. Onward!
With deep appreciation and warm wishes, I am,
Yours,
Hillary",
'"For the sake of our children and our families and our country, I ask you to stay engaged, stay engaged on every level. We need you. America needs you. Your energy, your ambition, your talent. That’s how we get through this. That’s how we help to make our contributions to bend the arc of the moral universe toward justice. I know this isn’t easy, I know that over the past week, a lot of people have asked themselves whether America is the country we thought it was. The divisions laid bare by this election run deep, but please listen to me when I say this. America is worth it. Our children are worth it. Believe in our country, fight for our values and never, ever give up." —Hillary',
"If you’ve already voted, jump on the phone and remind voters in key battleground states to go vote: hillaryclinton.com/calls",
]

matthew_own_posts = ["An old friend and hero of mine Evel Knievel’s famous cane (which had a secret custom flask always filled with Wild Turkey) just came up for auction…might have to bid
http://www.whosay.com/l/FoDc79u",
"5 Olympics, 26 medals, 22 golds and counting- this man's gonna sleep well!"]

jennifer_own_posts = ["My broken heart goes out to the innocent lives of Muslim refugees that are trying to escape terror and find safety for their families. I and millions of Americans understand that someone's race or religion should never keep them in harm's way. It should be every person's duty to help and protect anyone no matter their nationality. I pray for sanity and compassion to return to the White House.",
"Watching the Women's March from the set in Budapest. I wish I could be there but my thoughts and full support are with those marching today. Do not give this administration a 'chance' to do the terrible things it wants to do. LGBT and environmental information has already been removed from the White House website. Fight for equality, fight for women to have control over their bodies. Thank you to all of those who are taking action!
PS Donald Trump, you're a bad dancer",
"Louisville has lost a great legend, a great athlete and a great human. Thank you Muhammed Ali for sharing your talent and heart with the world.
--Jen"]

mark_own_posts = ["Thanks to NASCAR, Hendrick Motorsports, Dale Earnhardt Jr. for hosting me at the Charlotte Motor Speedway in North Carolina.
I learned a lot about the engineering that goes into these cars. Each engine is designed to run at 9,000 RPMs for 700 miles in a single race, and then it's done. It gets up to 140 degrees in the cockpit of the cars, and drivers are in there for up to five hours in a race. They drive an average close to 200mph during these races. That's a bit faster than I go in my GTI."]

taylor_own_posts = ["Thanks Houston 💋

And Versace for making this outfit situation 💕💕💕 Getty Images Entertainment",
"Pre-order the Fifty Shades Official Motion Picture Soundtrack with “I Don’t Wanna Live Forever (Fifty Shades Darker)”. Available instantly when you pre-order!",
"OH MY GOD
OKAY ITS HAPPENING
EVERYBODY STAY CALM"]

[donald, sean, hillary, matthew, jennifer, taylor, mark, bill].each do |u|
  add_profile_pics(u)
  own_posts(u, eval("#{u.fname.downcase}_own_posts"))
end

# create_friendship(mark,donald)
create_friendship(mark,sean)
create_friendship(mark,jennifer)
create_friendship(mark,taylor)
create_friendship(mark,matthew)
create_friendship(mark,hillary)
create_friendship(mark,bill)


create_friendship(donald,sean)
create_friendship(hillary,matthew)
create_friendship(hillary,jennifer)
create_friendship(hillary,taylor)
create_friendship(matthew,jennifer)
create_friendship(matthew,taylor)
create_friendship(jennifer,taylor)


photo = Photo.create!(image: "https://s3.amazonaws.com/oopbook/seeds/donald/ivanka_insta.jpg", user_id: donald.id)
post = Post.find_by('body ILIKE ?', '%ivanka%')
post.content = photo
post.save!

photo = Photo.create!(image: "https://s3.amazonaws.com/oopbook/seeds/donald/abe.jpg", user_id: donald.id)
post = Post.find_by('body ILIKE ?', '%andrews%')
post.content = photo
post.save!

photo = Photo.create!(image: "https://s3.amazonaws.com/oopbook/seeds/jennifer/photo.jpg", user_id: jennifer.id)
post = Post.find_by('body ILIKE ?', '%budapest%')
post.content = photo
post.save!

photo = Photo.create!(image: "https://s3.amazonaws.com/oopbook/seeds/matthew/photo1.jpg", user_id: matthew.id)
post = Post.find_by('body ILIKE ?', '%olympics%')
post.content = photo
post.save!

photo = Photo.create!(image: "https://s3.amazonaws.com/oopbook/seeds/taylor/photo.png", user_id: taylor.id)
post = taylor.posts.last
post.content = photo
post.save!

photo = Photo.create!(image: "https://s3.amazonaws.com/oopbook/seeds/mark/nascar.jpg", user_id: mark.id)
post = mark.posts.last
post.content = photo
post.save!

Post.create!(wall_id: mark.id, author_id: taylor.id, body: 'Love your site!')
Post.create!(wall_id: mark.id, author_id: matthew.id, body: 'How do I log out?')
Comment.create!(author_id: jennifer.id, post_id: Post.last.id, body: 'Click the logout button... duhhh...')
Comment.create!(author_id: matthew.id, post_id: Post.last.id, parent_id: Comment.last.id, body: "It doesn't work")
Like.create!(liker_id: taylor.id, likeable: Post.last)
Like.create!(liker_id: matthew.id, likeable: Post.last)
Like.create!(liker_id: donald.id, likeable: Post.last)
Like.create!(liker_id: taylor.id, likeable: Comment.first)
Like.create!(liker_id: matthew.id, likeable: Comment.last)
Like.create!(liker_id: donald.id, likeable: Comment.first)

channel = Channel.create!
ChannelSub.create!(participant_id: taylor.id, channel_id: channel.id)
ChannelSub.create!(participant_id: mark.id, channel_id: channel.id)
Message.create!(sender_id: taylor.id, channel_id: channel.id, body: "Hey whats up?")
Message.create!(sender_id: taylor.id, channel_id: channel.id, body: "Are you there??")

channel = Channel.create!
ChannelSub.create!(participant_id: taylor.id, channel_id: channel.id)
ChannelSub.create!(participant_id: mark.id, channel_id: channel.id)
ChannelSub.create!(participant_id: jennifer.id, channel_id: channel.id)
Message.create!(sender_id: taylor.id, channel_id: channel.id, body: "Hey guys wanna come to my concert next week?")
Message.create!(sender_id: jennifer.id, channel_id: channel.id, body: "SURE!")
