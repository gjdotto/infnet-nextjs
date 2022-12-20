import type { GetStaticProps } from "next";
import { SiteHead } from "src/components/SiteHead";
import {
  ProfileHeader,
  ProfileHeaderProps,
} from "src/components/ProfileHeader";
import { apolloClient } from "src/cms/apolloClient";
import { Timeline, TimelineProps } from "src/components/Timeline";
import { decodeUserInfo } from "src/cms/decoders/decodeUserInfo";
import { queryUserInfo } from "src/cms/queries/queryUserInfo";
import { getPostPage } from "src/cms/getPostPage";
import { mapPostsToFeedItems } from "src/cms/mapPostsToFeedItems";
import { useSession } from "next-auth/react";

export type HomeProps = {
  posts: TimelineProps["items"];
  pagination: TimelineProps["pagination"] & { total: number };
  userInfo: ProfileHeaderProps;
};

export default function Home({ posts, pagination, userInfo }: HomeProps) {
  const { data, status } = useSession();
  return (
    <article>
      <SiteHead title="Home" />
      <header>
        <ProfileHeader {...userInfo} />
      </header>
      <section className="feed-container">
        <Timeline items={posts} pagination={pagination} />
      </section>
    </article>
  );
}

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const { posts, pagination } = await getFeedProps();
  const userInfo = await getUserInfoProps(pagination.total);
  return {
    props: {
      posts,
      pagination,
      userInfo,
    },
  };
};

async function getUserInfoProps(
  publishCount: number
): Promise<HomeProps["userInfo"]> {
  const { data } = await apolloClient.query({
    query: queryUserInfo,
  });
  const userInfo = decodeUserInfo(data);
  return { ...userInfo, publishCount };
}

async function getFeedProps(): Promise<{
  posts: HomeProps["posts"];
  pagination: HomeProps["pagination"];
}> {
  const results = await getPostPage(1);
  const posts = mapPostsToFeedItems(results.posts);

  const { pageCount, page: currentPage, total } = results.pagination;

  const pagination = {
    currentPage,
    pageCount,
    hasNextPage: pageCount > currentPage,
    hasPreviousPage: false,
    total,
  };

  return { posts, pagination };
}
