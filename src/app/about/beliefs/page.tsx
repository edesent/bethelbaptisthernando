import type { Metadata } from "next";
import PageHead from "@/components/PageHead";
import { church } from "@/lib/site";

export const metadata: Metadata = {
  title: "What we believe",
  description: `The statement of faith of ${church.name}, Hernando, Florida: the Scriptures, the one true God, salvation by grace through faith, the local church, baptism and the return of Christ.`,
};

/** The church's own statement, word for word from its Beliefs page. */
const beliefs = [
  ["The Holy Scriptures", "We believe that “All scripture is given by inspiration of God,” (2 Timothy 3:16) and that God has promised to preserve His Word (Psalm 12:6, 7). We believe that the Authorized King James 1611 Bible is the inspired and preserved Word of God and is therefore, supreme, inerrant, infallible, and the final authority for all matters of faith and practice. (2 Peter 1:20-21; 1 Corinthians 2:13)"],
  ["One True God", "We believe there is only one True and Living God (Exodus 20:2, 3) and that in the Unity of the Godhead, there are three persons, the Father, the Son, and the Holy Spirit (Genesis 1:1-3; Matthew 28:19; Luke 3:21-22; 2 Corinthians 13:14; 1 John 5:7)."],
  ["The Deity of Jesus Christ", "We believe in the absolute Deity of the Son, the Lord Jesus Christ (John 1:1-2, 14). He is divine as no other man can be, being very God, existing from all eternity co-equal with the Father and the Spirit. He never ceased to be God for one instant and His humiliation did not consist in laying aside His Deity. As man, He was miraculously begotten of the Holy Spirit and born of the virgin Mary. (Luke 1:26-28; Hebrews 1:8; 1 John 5:20)"],
  ["The Holy Spirit", "We believe that the Holy Spirit is a Divine Person, equal with the Father and the Son (John 14:16-18). He convicts of sin, righteousness, judgment (John 16:7-11), bears witness to the truth, is the agent of the new birth and seals, endues, teaches, witness to, sanctifies, and helps the believer, indwelling every true child of God. (Romans 8:14-27; Ephesians 4:30, 5:18-19)"],
  ["Salvation by Grace through Faith", "We believe that the only escape from the condemnation of sin is through the redemption wrought by Jesus Christ (Romans 6:23). Jesus, without sin, suffered, died, and rose again (1 Corinthians 15:3-4) in order to satisfy the justice of God for the sin of man. (John 3:1-18; Romans 3:20-26; Hebrews 10:4-14; 1 Peter 1:19-20). We believe that faith in the finished work of Jesus Christ is the only condition of salvation from sin and this salvation is wholly by grace; that no works, however good, make salvation more secure (Romans 10:9-13; Ephesians 2:8-9; Titus 3:5-7)."],
  ["Heaven, Hell and the Lake of Fire", "We believe in a literal Heaven and a literal Hell. Heaven is the place reserved for all who receive Jesus Christ as their personal Saviour (John 14:1-3; Revelation 21). Hell is a place of everlasting punishment leading to the eternal Lake of Fire for all who reject Jesus Christ and those who have rejected the witness of God’s power and glory in creation (Psalm 9:17; 2 Thessalonians 1:7-9; Romans 1:19-2:1; Revelation 20:10-15)."],
  ["The Local Church", "We believe the local church to be a body of believers who come together in obedience to Christ to carry out the dictates of the New Testament (Matthew 28:19, 20). The local church should be self-governing and independent from any interference of hierarchy, individuals, and organizations. Believers should assemble together locally in order to be edified in the word of God and to serve the Lord (Acts 11:23-26). The proper order for the local church is laid out especially in the Pastoral Epistles (1 Timothy 3:15). Bethel Baptist Church is an independent Baptist Church."],
  ["The Body of Christ", "We believe that every believer in the Church Age is baptized by the Holy Spirit into the spiritual body of Christ upon salvation (1 Corinthians 12:13). We believe that the body of Christ was a great mystery that was hidden from the past ages until it was first revealed by Christ through the apostle Paul (Ephesians 3:1-12). There is only one body (Ephesians 4:4) of which Christ is the Head (Ephesians 1:22-23). The body of Christ (the church) is a spiritual organism made up of all born-again Christians."],
  ["Baptism and the Lord’s Supper", "We believe in following the Biblical pattern of baptism. Water baptism is only for those who have first believed in Jesus (Acts 8:37). It is a full immersion into water symbolizing and identifying with the death, burial, and resurrection of Christ (Matthew 3:16). Baptism will also identify you with the local church. It is obedience to the Lord’s command (Matthew 28:19). Water baptism can in no wise impute grace or forgiveness of sins (1 Corinthians 1:17; Romans 4:24). We believe the Lord’s Supper (“Communion”) to be a remembrance of what Christ did for us. The unleavened bread and fruit of the vine symbolize His body and blood. This special time of self-examination and appreciation allows us to not only look back but also ahead to His coming (1 Corinthians 11:23-34). The elements in no way, shape, or form become supernatural but are only symbolic."],
  ["The Return of Christ", "We believe in the bodily, personal, pre-millenial return of Jesus Christ; that He will come before the seven year tribulation period to catch away His church, coming only in the air, and that He will return with His church at the end of the tribulation age to judge the living nations and setup His kingdom on the earth for one thousand years. (Daniel 9:24-27; Matthew 24:1-31; 1 Thessalonians 4:13-18; Revelation 19:11-20:6)"],
];

export default function Beliefs() {
  return (
    <>
      <PageHead
        eyebrow="What we believe"
        title={
          <>
            Our statement <span className="script text-gold-light">of faith.</span>
          </>
        }
        lede="In the church’s own words. Every line has its chapter and verse."
        photo="openBible"
        position="center 40%"
      />
      <section className="bg-paper">
        <div className="wrap py-16 md:py-24">
          <div className="mx-auto max-w-3xl divide-y divide-ink/10">
            {beliefs.map(([h, p], i) => (
              <article key={h} className="py-8" data-reveal={Math.min(i, 3)}>
                <h2 className="display text-3xl sm:text-4xl">{h}</h2>
                <p className="mt-4 text-lg leading-relaxed text-ink/85">{p}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
