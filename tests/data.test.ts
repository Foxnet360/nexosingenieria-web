import { describe, it } from 'node:test';
import assert from 'node:assert';
import { getAllBlogPosts, getBlogPostBySlug } from '../src/data/blog.ts';
import { getAllProjects, getProjectBySlug, realProjectsList } from '../src/data/projects.ts';

describe('Data Integrity - Blog', () => {
  it('should have all blog posts with required fields and valid slugs', () => {
    const posts = getAllBlogPosts();
    assert.strictEqual(posts.length > 0, true, 'Blog posts list should not be empty');

    const slugs = new Set();
    for (const post of posts) {
      assert.ok(post.id, 'Post should have an ID');
      assert.ok(post.title, 'Post should have a title');
      assert.ok(post.slug, 'Post should have a slug');
      assert.ok(post.category, 'Post should have a category');
      assert.ok(post.author?.name, 'Post should have an author name');
      assert.ok(post.content?.length > 100, 'Post content should be substantial HTML');

      assert.strictEqual(slugs.has(post.slug), false, `Slug should be unique: ${post.slug}`);
      slugs.add(post.slug);
    }
  });

  it('should find existing blog post by slug and return undefined for invalid slug', () => {
    const post = getBlogPostBySlug('guia-cableado-estructurado-empresas-colombianas');
    assert.ok(post, 'Should retrieve post by slug');
    assert.strictEqual(post?.slug, 'guia-cableado-estructurado-empresas-colombianas');

    const invalid = getBlogPostBySlug('non-existent-article-123');
    assert.strictEqual(invalid, undefined);
  });
});

describe('Data Integrity - Projects', () => {
  it('should have 12 verified projects with complete detail records', () => {
    const projects = getAllProjects();
    assert.strictEqual(projects.length, 12, 'Should have exactly 12 projects');

    for (const p of projects) {
      assert.ok(p.slug, 'Project should have a slug');
      assert.ok(p.title, 'Project should have a title');
      assert.ok(p.client, 'Project should have a client');
      assert.ok(p.location, 'Project should have a location');
      assert.ok(p.image, 'Project should have an image path');

      const detail = getProjectBySlug(p.slug);
      assert.ok(detail, `Detail record should exist for slug: ${p.slug}`);
      assert.ok(detail?.challenge, 'Project detail should have challenge');
      assert.ok(detail?.solution, 'Project detail should have solution');
      assert.ok(Array.isArray(detail?.services), 'Services should be an array');
      assert.ok(Array.isArray(detail?.results), 'Results should be an array');
    }
  });
});
