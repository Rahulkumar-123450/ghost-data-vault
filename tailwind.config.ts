
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				orbitron: ['Orbitron', 'sans-serif'],
				spacemono: ['Space Mono', 'monospace'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				cyber: {
					black: '#000000',
					steel: '#12121D',
					gray: '#1A1A24',
					cyan: '#00FFE5',
					red: '#FF1A36',
					purple: '#9D00FF',
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			keyframes: {
				'accordion-down': {
					from: { height: '0' },
					to: { height: 'var(--radix-accordion-content-height)' }
				},
				'accordion-up': {
					from: { height: 'var(--radix-accordion-content-height)' },
					to: { height: '0' }
				},
				'glitch-text': {
					'0%': { 
						transform: 'translate(0)', 
						textShadow: '0.05em 0 0 rgba(255, 26, 54, 0.75), -0.05em -0.025em 0 rgba(0, 255, 229, 0.75)' 
					},
					'25%': { 
						transform: 'translate(0.025em, 0.025em)', 
						textShadow: '0.05em 0 0 rgba(255, 26, 54, 0.75), -0.05em -0.025em 0 rgba(0, 255, 229, 0.75)' 
					},
					'50%': { 
						transform: 'translate(-0.05em, -0.025em)', 
						textShadow: '0.05em 0 0 rgba(255, 26, 54, 0.75), -0.05em -0.025em 0 rgba(0, 255, 229, 0.75)' 
					},
					'75%': { 
						transform: 'translate(0.025em, 0.025em)', 
						textShadow: '-0.05em -0.025em 0 rgba(255, 26, 54, 0.75), 0.025em 0.025em 0 rgba(0, 255, 229, 0.75)' 
					},
					'100%': { 
						transform: 'translate(0)', 
						textShadow: '0.05em 0 0 rgba(255, 26, 54, 0.75), -0.05em -0.025em 0 rgba(0, 255, 229, 0.75)' 
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '0.5',
						boxShadow: '0 0 15px rgba(0, 255, 229, 0.3), 0 0 30px rgba(0, 255, 229, 0.2)'
					},
					'50%': {
						opacity: '1',
						boxShadow: '0 0 25px rgba(0, 255, 229, 0.6), 0 0 50px rgba(0, 255, 229, 0.4)'
					}
				},
				'float': {
					'0%, 100%': {
						transform: 'translateY(0)'
					},
					'50%': {
						transform: 'translateY(-10px)'
					}
				},
				'data-stream': {
					'0%': {
						backgroundPosition: '0% 0%'
					},
					'100%': {
						backgroundPosition: '0% 100%'
					}
				},
				'scanline': {
					'0%': {
						transform: 'translateY(0)'
					},
					'100%': {
						transform: 'translateY(100vh)'
					}
				},
				'rotate-slow': {
					'0%': {
						transform: 'rotate(0deg)'
					},
					'100%': {
						transform: 'rotate(360deg)'
					}
				},
				'typing': {
					'from': { width: '0' },
					'to': { width: '100%' }
				},
				'blink-caret': {
					'from, to': { borderColor: 'transparent' },
					'50%': { borderColor: 'rgba(0, 255, 229, 0.75)' }
				},
				'flicker': {
					'0%, 100%': { opacity: '1' },
					'25%': { opacity: '0.5' },
					'50%': { opacity: '0.7' },
					'75%': { opacity: '0.2' }
				},
				'bounce-slow': {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0.8, 0, 1, 1)'
					},
					'50%': {
						transform: 'translateY(-15px)',
						animationTimingFunction: 'cubic-bezier(0, 0, 0.2, 1)'
					}
				},
				'appear': {
					'0%': {
						opacity: '0',
						transform: 'scale(0.8) translateY(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'scale(1) translateY(0)'
					}
				},
				'slide-up': {
					'0%': {
						opacity: '0',
						transform: 'translateY(50px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'slide-in-left': {
					'0%': {
						opacity: '0',
						transform: 'translateX(-100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'slide-in-right': {
					'0%': {
						opacity: '0',
						transform: 'translateX(100px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateX(0)'
					}
				},
				'ripple': {
					'0%': {
						transform: 'scale(1)',
						opacity: '1'
					},
					'100%': {
						transform: 'scale(2)',
						opacity: '0'
					}
				},
				'terminal-boot': {
					'0%': { clipPath: 'polygon(0 0, 100% 0, 100% 0, 0 0)' },
					'100%': { clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'glitch-text': 'glitch-text 3s infinite linear alternate-reverse',
				'pulse-glow': 'pulse-glow 3s infinite',
				'float': 'float 6s ease-in-out infinite',
				'data-stream': 'data-stream 20s linear infinite',
				'scanline': 'scanline 10s linear infinite',
				'rotate-slow': 'rotate-slow 12s linear infinite',
				'typing': 'typing 3.5s steps(40, end) forwards',
				'blink-caret': 'blink-caret 0.75s step-end infinite',
				'flicker': 'flicker 0.5s ease-in-out infinite',
				'bounce-slow': 'bounce-slow 5s infinite',
				'appear': 'appear 0.6s ease-out forwards',
				'slide-up': 'slide-up 0.5s ease-out forwards',
				'slide-in-left': 'slide-in-left 0.7s ease-out forwards',
				'slide-in-right': 'slide-in-right 0.7s ease-out forwards',
				'ripple': 'ripple 0.6s ease-out forwards',
				'terminal-boot': 'terminal-boot 1s ease-in-out forwards'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
