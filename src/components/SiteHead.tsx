import NextHead from "next/head";

export type HeadProps = {
  title: string;
};

export function SiteHead({ title }: HeadProps) {
  const metaTitle = `${title} | WeTravel`;
  return (
    <NextHead>
      <title>{metaTitle}</title>
    </NextHead>
  );
}
