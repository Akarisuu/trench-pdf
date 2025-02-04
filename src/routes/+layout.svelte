<script lang="ts">
	import Moon from 'lucide-svelte/icons/moon';
	import Sun from 'lucide-svelte/icons/sun';
	import { ModeWatcher, toggleMode } from 'mode-watcher';
	import '../app.css';

	import Footer from '$lib/components/footer/footer.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as m from '$lib/i18n/messages';

	let { children } = $props();
</script>

<ModeWatcher defaultMode="dark" lightClassNames={['light']} darkClassNames={[]} />

<main class={'container h-screen  md:px-8 lg:px-16'}>
	<div class="flex w-full items-center justify-between py-8">
		<a href="/" class="transition-colors"><h1 class="text-4xl font-extrabold">Trench PDF</h1></a>
		<Button onclick={toggleMode} variant="outline" size="icon">
			<Sun
				class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"
			/>
			<Moon
				class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"
			/>
			<span class="sr-only">{m.shared_pageName()}</span>
		</Button>
	</div>

	<p class="mb-10 w-full max-w-lg text-balance text-sm text-muted-foreground md:mb-4 md:text-base">
		<span>{m.home_description1()}</span>
		<a href="https://www.trenchcrusade.com/" target="_blank">Trench Crusade</a>
		<span>{m.home_description2()}</span>
		<a href="https://trenchcompendium.netlify.app/" target="_blank">{m.home_builder_name()} </a>
	</p>
	{@render children?.()}
	<Footer />
</main>
