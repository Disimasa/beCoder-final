<script context="module">
    export async function preload({params, query}) {
        return this.fetch(`blog.json`).then(r => r.json()).then(posts => {
            return {posts};
        });
    }
</script>

<script>

    export let posts;
    let slug;
    let html;
    let title;

    async function handleClick() {
        await fetch('blog.json', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
                // 'Content-Type': 'application/x-www-form-urlencoded',
            },
            redirect: 'follow', // manual, *follow, error
            referrerPolicy: 'no-referrer', // no-referrer, *client
            body: JSON.stringify({slug, html, title})
        })

    }
</script>

<style>
    ul {
        margin: 0 0 1em 0;
        line-height: 1.5;
    }
</style>

<svelte:head>
    <title>Blog</title>
</svelte:head>

<h1>Recent posts</h1>
<form>
    <input bind:value={title} placeholder="Title">
    <input bind:value={html} placeholder="html">
    <input bind:value={slug} placeholder="Slug">
    <button type="button" on:click={handleClick}>Опубликовать</button>
</form>
<ul>
    {#each posts as post}
    <!-- we're using the non-standard `rel=prefetch` attribute to
				tell Sapper to load the data for the page as soon as
				the user hovers over the link or taps it, instead of
				waiting for the 'click' event -->
        <li><a rel='prefetch' href='blog/{post.slug}'>{post.title}</a></li>
    {/each}
</ul>