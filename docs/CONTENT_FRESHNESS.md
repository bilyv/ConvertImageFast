# Content Freshness Guidelines

This document provides guidelines for maintaining content freshness indicators on the ConvertImageFast website. Content freshness is important for SEO as it helps search engines understand when your content was last updated.

## Implemented Content Freshness Indicators

The following content freshness indicators have been implemented:

1. **XML Sitemap lastmod dates**: The sitemap.xml file includes lastmod dates for each URL, which are automatically updated when you run the build process.

2. **og:updated_time meta tags**: All pages include og:updated_time meta tags that are dynamically generated with the current date and time.

3. **Schema.org dateModified property**: The WebApplication and Organization schema.org structured data includes dateModified properties.

## Automatic Updates

The following mechanisms automatically update content freshness indicators:

1. **Build-time updates**: When you run `bun run build`, the prebuild script automatically updates the sitemap.xml file with the current date.

2. **Dynamic meta tags**: The og:updated_time meta tags are dynamically generated at runtime using the getCurrentDateTimeISO() function.

3. **Schema.org dateModified**: The dateModified property in Schema.org structured data is dynamically generated at runtime.

## Manual Updates

You can manually update the content freshness indicators as follows:

1. **Update sitemap.xml**: Run `bun run update-sitemap` to update the lastmod dates in the sitemap.xml file.

2. **Update content dates**: Modify the contentLastUpdated object in src/utils/dateUtils.ts to reflect when specific content was last updated.

## Best Practices

1. **Regular Updates**: Run the update-sitemap script after making significant changes to the website.

2. **Consistent Dates**: Ensure that the dates in the sitemap.xml file, og:updated_time meta tags, and Schema.org structured data are consistent.

3. **Actual Changes**: Only update the content freshness indicators when you've made actual changes to the content.

4. **HTTP Headers**: Consider configuring your web server to send Last-Modified HTTP headers for all pages.

## Monitoring

Regularly check the following to ensure content freshness indicators are working correctly:

1. **Google Search Console**: Check for any warnings or errors related to sitemap.xml.

2. **Rich Results Test**: Use Google's Rich Results Test to verify that the Schema.org structured data is correctly implemented.

3. **Meta Tag Validator**: Use a meta tag validator to verify that the og:updated_time meta tags are correctly implemented.

## Troubleshooting

If you encounter issues with content freshness indicators:

1. **Sitemap not updating**: Check that the prebuild script is running correctly and that the sitemap.xml file is being updated.

2. **Meta tags not updating**: Check that the getCurrentDateTimeISO() function is being called correctly.

3. **Schema.org not updating**: Check that the getCurrentDateISO() function is being called correctly.

## Additional Resources

- [Google's documentation on sitemaps](https://developers.google.com/search/docs/advanced/sitemaps/build-sitemap)
- [Open Graph protocol documentation](https://ogp.me/)
- [Schema.org WebApplication documentation](https://schema.org/WebApplication)
