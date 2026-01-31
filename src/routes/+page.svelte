<script lang="ts">
	// Landing Page Logic (si se necesita alguna animación simple)
</script>

<div class="relative overflow-hidden">
	<!-- Hero Section -->
	<div class="relative pt-12 pb-16 sm:pt-20 sm:pb-24">
		<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
			
			<div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wide mb-6 border border-blue-100 animate-fade-in-up">
				<span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
				La nueva era del deporte amateur
			</div>

			<h1 class="font-brand text-5xl sm:text-7xl font-bold tracking-tight text-gray-900 mb-6 leading-tight uppercase">
				Gestiona tus torneos <br class="hidden sm:block" />
				<span class="bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-400 bg-clip-text text-transparent">
					como un profesional
				</span>
			</h1>

			<p class="mt-4 max-w-2xl mx-auto text-xl text-gray-500 mb-10">
				Organiza ligas, gestiona equipos y sigue los resultados en tiempo real. 
				Todo lo que necesitas para llevar tu pasión al siguiente nivel.
			</p>

			<!-- Mobile First Actions -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center w-full max-w-md mx-auto">
				<a href="/register" class="w-full sm:w-auto px-8 py-4 bg-blue-600 text-white text-lg font-bold rounded-xl shadow-xl shadow-blue-200 hover:bg-blue-700 hover:scale-105 transition-all flex justify-center items-center gap-2">
					🚀 Empezar Gratis
				</a>
				<a href="/login" class="w-full sm:w-auto px-8 py-4 bg-white text-gray-700 border-2 border-gray-100 text-lg font-bold rounded-xl hover:bg-gray-50 hover:border-gray-200 transition-all flex justify-center items-center gap-2">
					🔐 Iniciar Sesión
				</a>
			</div>
		</div>

		<!-- Decorative Background Elements -->
		<div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full overflow-hidden -z-10 pointer-events-none">
			<div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob"></div>
			<div class="absolute top-0 right-1/4 w-96 h-96 bg-cyan-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000"></div>
			<div class="absolute -bottom-32 left-1/2 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000"></div>
		</div>
	</div>

	<!-- Features Grid (Mobile Responsive) -->
	<section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid grid-cols-1 md:grid-cols-3 gap-6">
			<!-- Feature 1 -->
			<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow group">
				<div class="w-14 h-14 bg-blue-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
					🏆
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-3">Torneos Automatizados</h3>
				<p class="text-gray-500 leading-relaxed">
					Genera fixtures automáticamente, actualiza tablas de posiciones al instante y comparte resultados en vivo.
				</p>
			</div>

			<!-- Feature 2 -->
			<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow group">
				<div class="w-14 h-14 bg-cyan-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
					⚡
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-3">Resultados en Vivo</h3>
				<p class="text-gray-500 leading-relaxed">
					Tus jugadores podrán seguir cada gol, tarjeta y resultado desde sus móviles en tiempo real.
				</p>
			</div>

			<!-- Feature 3 -->
			<div class="p-8 bg-white rounded-2xl border border-gray-100 shadow-lg shadow-gray-100/50 hover:shadow-xl transition-shadow group">
				<div class="w-14 h-14 bg-purple-50 rounded-2xl flex items-center justify-center text-3xl mb-6 group-hover:scale-110 transition-transform">
					📱
				</div>
				<h3 class="text-xl font-bold text-gray-900 mb-3">App Web Progresiva</h3>
				<p class="text-gray-500 leading-relaxed">
					Instala la app en tu dispositivo sin descargas pesadas. Rápida, segura y siempre actualizada.
				</p>
			</div>
		</div>
	</section>
</div>

<style>
	/* Animaciones Custom */
	@keyframes blob {
		0% { transform: translate(0px, 0px) scale(1); }
		33% { transform: translate(30px, -50px) scale(1.1); }
		66% { transform: translate(-20px, 20px) scale(0.9); }
		100% { transform: translate(0px, 0px) scale(1); }
	}
	
	.animate-blob {
		animation: blob 7s range-infinite;
	}
	
	.animation-delay-2000 {
		animation-delay: 2s;
	}
	
	.animation-delay-4000 {
		animation-delay: 4s;
	}
</style>