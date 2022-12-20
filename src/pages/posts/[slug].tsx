import type { GetStaticPaths, GetStaticProps } from "next";
import { useLatestPosts } from "src/cms/hooks/useLatestPosts";
import { apolloClient } from "src/cms/apolloClient";
import { Destinations, DestinationsProps } from "src/components/Destinations";
import { Timeline } from "src/components/Timeline";
import { SiteHead } from "src/components/SiteHead";
import { processMarkdown } from "src/cms/processMarkdown";
import { queryPostsSlugs } from "src/cms/queries/queryPostsSlugs";
import { decodePosts } from "src/cms/decoders/decodePosts";
import { queryPostsBySlug } from "src/cms/queries/queryPostsBySlug";

export type PostPageProps = {
  title: string;
} & DestinationsProps;

export type PostPageQuery = {
  slug: string;
};

export default function PostPage(props: PostPageProps) {
  const { posts, loading } = useLatestPosts();

  return (
    <div className="post-page">
      <SiteHead title={props.title} />
      <Destinations {...props} />
      <div className="latest-posts">{!loading && <Timeline items={posts} />}</div>
      <style jsx>{`
        .latest-posts {
          margin-top: 32px;
        }
      `}</style>
    </div>
  );
}

export const getStaticProps: GetStaticProps<
  PostPageProps,
  PostPageQuery
> = async ({ params }) => {
  const { data } = await apolloClient.query({
    query: queryPostsBySlug,
    variables: {
      slug: params?.slug,
    },
  });

  const {
    posts: [post],
  } = decodePosts(data);
  const content = await processMarkdown(post.content);

  return {
    props: {
      ...post,
      content,
    },
  };
};

export const getStaticPaths: GetStaticPaths<PostPageQuery> = async () => {
  const { data } = await apolloClient.query({
    query: queryPostsSlugs,
  });

  const { posts } = decodePosts(data);
  const paths = posts.map(({ slug }) => ({ params: { slug } }));
  return {
    paths,
    fallback: false,
  };
};
