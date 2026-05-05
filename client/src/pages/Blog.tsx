import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";

const fallbackPosts = [
  {
    id: 1,
    title: "5 Signs Your Loved One May Need Home Care Support",
    slug: "signs-loved-one-needs-home-care",
    excerpt: "Recognising when a family member needs additional support can be difficult. Here are five key indicators that it may be time to consider professional home care.",
    category: "Care Tips",
    imageUrl: "/manus-storage/companionship_care_23d4f34f.png",
    createdAt: new Date("2025-05-01").toISOString(),
  },
  {
    id: 2,
    title: "Understanding Dementia: A Guide for Families",
    slug: "understanding-dementia-guide",
    excerpt: "Dementia affects millions of families across the UK. This guide helps you understand the condition and how person-centred care can make a real difference.",
    category: "Dementia Care",
    imageUrl: "/manus-storage/dementia_care_02fe9ada.png",
    createdAt: new Date("2025-04-25").toISOString(),
  },
  {
    id: 3,
    title: "The Importance of Companionship in Later Life",
    slug: "importance-companionship-later-life",
    excerpt: "Loneliness is one of the biggest challenges facing older adults. Discover how companionship care can transform daily life and improve wellbeing.",
    category: "Wellbeing",
    imageUrl: "/manus-storage/park_walk_687bf40e.png",
    createdAt: new Date("2025-04-18").toISOString(),
  },
  {
    id: 4,
    title: "Preparing for a Loved One's Return from Hospital",
    slug: "preparing-return-from-hospital",
    excerpt: "Bringing a family member home after a hospital stay requires careful planning. Here is how to ensure a safe and comfortable transition.",
    category: "Recovery",
    imageUrl: "/manus-storage/day_in_the_life_b3b6b710.png",
    createdAt: new Date("2025-04-10").toISOString(),
  },
];

export default function Blog() {
  const { data: dbPosts } = trpc.blog.published.useQuery();
  const posts = dbPosts && dbPosts.length > 0 ? dbPosts : fallbackPosts;

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-[var(--purple-deep)] to-[var(--purple-primary)] py-16">
        <div className="container text-center text-white">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">News & Care Tips</h1>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Helpful resources, care tips, and company updates from Good Shepherd HomeCare Ltd.
          </p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-16">
        <div className="container">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <Link key={post.id} href={`/blog/${post.slug}`}>
                <article className="group bg-white rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-lg transition-all cursor-pointer h-full flex flex-col">
                  {post.imageUrl && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="p-6 flex flex-col flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      {post.category && (
                        <span className="flex items-center gap-1 text-xs font-medium text-[var(--purple-primary)] bg-[var(--purple-lightest)] px-2.5 py-1 rounded-full">
                          <Tag className="w-3 h-3" /> {post.category}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3" />
                        {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" })}
                      </span>
                    </div>
                    <h2 className="text-lg font-semibold text-foreground group-hover:text-[var(--purple-primary)] transition-colors mb-2" style={{ fontFamily: "'Playfair Display', serif" }}>
                      {post.title}
                    </h2>
                    <p className="text-sm text-muted-foreground leading-relaxed flex-1">
                      {post.excerpt}
                    </p>
                    <div className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--purple-primary)]">
                      Read more <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="bg-[var(--purple-lightest)] py-12">
        <div className="container text-center">
          <h2 className="text-2xl font-bold text-[var(--purple-primary)] mb-4">Stay Updated</h2>
          <p className="text-muted-foreground mb-6">
            Follow us on social media for the latest care tips and company news.
          </p>
          <div className="flex justify-center gap-4">
            <a href="https://www.instagram.com/tgs.homecare/" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[var(--purple-primary)] text-[var(--purple-primary)]">
                Instagram
              </Button>
            </a>
            <a href="https://www.facebook.com/tgshomecare" target="_blank" rel="noopener noreferrer">
              <Button variant="outline" className="border-[var(--purple-primary)] text-[var(--purple-primary)]">
                Facebook
              </Button>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
