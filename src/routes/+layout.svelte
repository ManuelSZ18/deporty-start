<script lang="ts">
	import "./layout.css";
	import logo from '$lib/assets/icon.png';
	let { children } = $props();
</script>

<div class="min-h-screen flex flex-col bg-gray-50 text-gray-900 font-sans">
	<!-- Navbar simple para la Landing -->
	<nav class="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
			<div class="flex justify-center md:justify-between items-center h-16">
				<!-- Logo -->
				<div class="flex-shrink-0 flex items-center gap-3 content-center">
					<img src={logo} alt="Deporty Logo" class="w-10 h-10 object-contain drop-shadow-md" />
					<span class="font-brand text-2xl font-bold bg-gradient-to-r from-blue-700 to-blue-500 bg-clip-text text-transparent tracking-wide">
						DEPORTY
					</span>
				</div>

				<!-- Desktop Nav Links (Placeholder) -->
				<div class="hidden md:flex items-center space-x-4">
					<a href="/login" class="text-sm font-medium text-gray-600 hover:text-blue-600 transition-colors">Iniciar Sesión</a>
					<a href="/register" class="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-all shadow-md hover:shadow-lg">
						Registrarse
					</a>
				</div>
			</div>
		</div>
	</nav>

	<!-- Contenido Principal -->
	<main class="flex-grow">
		{@render children()} 
	</main>

	<!-- Footer -->
	<footer class="bg-white border-t border-gray-100 py-8 mt-auto">
		<div class="max-w-7xl mx-auto px-4 text-center">
			<p class="text-sm text-gray-400">
				© 2026 Deporty. Hecho con 💙 para el deporte.
			</p>
		</div>
	</footer>
</div>
