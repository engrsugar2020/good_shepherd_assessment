import { Link, useParams } from "wouter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Calendar, Tag } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Streamdown } from "streamdown";

export default function BlogPost() {
  const params = useParams<{ slug: string }>();
  const { data: post, isLoading } = trpc.blog.bySlug.useQuery({ slug: params.slug || "" });

  if (isLoading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="animate-pulse text-[var(--purple-primary)]">Loading...</div>
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Post Not Found</h1>
          <p className="text-muted-foreground mb-6">This blog post could not be found.</p>
          <Link href="/blog">
            <Button className="bg-[var(--purple-primary)] text-white">Back to Blog</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12">
      <div className="container max-w-3xl">
        <Link href="/blog" className="inline-flex items-center gap-2 text-sm text-[var(--purple-primary)] hover:underline mb-6">
          <ArrowLeft className="w-4 h-4" /> Back to Blog
        </Link>

        {post.imageUrl && (
          <div className="rounded-xl overflow-hidden mb-8 aspect-[16/9]">
            <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover" />
          </div>
        )}

        <div className="flex items-center gap-3 mb-4">
          {post.category && (
            <span className="flex items-center gap-1 text-xs font-medium text-[var(--purple-primary)] bg-[var(--purple-lightest)] px-2.5 py-1 rounded-full">
              <Tag className="w-3 h-3" /> {post.category}
            </span>
          )}
          <span className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3 h-3" />
            {new Date(post.createdAt).toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric" })}
          </span>
        </div>

        <h1 className="text-3xl lg:text-4xl font-bold text-[var(--purple-primary)] mb-6">{post.title}</h1>

        <div className="prose prose-purple max-w-none">
          <Streamdown>{post.content}</Streamdown>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center">
          <h3 className="text-xl font-semibold text-[var(--purple-primary)] mb-3">Need Care Support?</h3>
          <p className="text-muted-foreground mb-4">Our team is here to help. Request a free, no-obligation care assessment.</p>
          <Link href="/assessment">
            <Button className="bg-[var(--purple-primary)] hover:bg-[var(--purple-dark)] text-white">
              Free Care Assessment
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
