<script lang="ts">
	import Github from '$lib/assets/icons/github.svelte';
	import * as m from '$lib/i18n/messages';
</script>

<footer
	class="fixed bottom-0 left-0 flex w-full flex-col items-center justify-center gap-2 text-balance bg-gradient-to-t from-primary/25 to-background to-70% px-6 py-4 text-center text-xs font-light sm:flex-row-reverse sm:gap-4"
>
	<p>
		<span>
			{m.shared_footer_bugInfo()}
		</span>
		<a href="https://discordapp.com/users/226362049196720128" class="font-bold"
			>{m.shared_footer_discord()}</a
		>
	</p>

	<div class="hidden h-5 w-px bg-foreground sm:block"></div>

	<a href="https://github.com/Akarisuu/trench-pdf" target="_blank">
		<Github class="w-5 fill-foreground hover:fill-foreground/80" />
	</a>
</footer>
