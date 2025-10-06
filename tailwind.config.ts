
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
			backgroundImage: {
				'primary-pattern': "url(\"data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='rgba(255,255,255,0.05)'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e\")",
			},
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				'border-c': 'hsl(var(--border-c))',
				'input-c': 'hsl(var(--input-c))',
				'ring-c': 'hsl(var(--ring-c))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: '#00102c',
					foreground: '#ffffff',
					'c': 'hsl(var(--primary-c)',
					'c-foreground': 'hsl(var(--primary-c-foreground))',
					'c-hover': 'hsl(var(--primary-c-hover))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))',
					c: 'hsl(var(--secondary-c))',
					'c-foreground': 'hsl(var(--secondary-c-foreground))',
					'c-hover': 'hsl(var(--secondary-c-hover))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))',
					c: 'hsl(var(--muted-c))',
					'c-foreground': 'hsl(var(--muted-c-foreground))'
				},
				accent: {
					DEFAULT: '#ff5f1b',
					foreground: '#ffffff',
					c: 'hsl(var(--accent-c))',
					'c-foreground': 'hsl(var(--accent-c-foreground))',
				},
				success: {
					DEFAULT: '#86e5a1',
					foreground: '#00102c'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))',
					'foreground-c': 'hsl(var(--popover-foreground-c))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))',

					c: 'hsl(var(--sidebar-c-background))',
					'c-foreground': 'hsl(var(--sidebar-c-foreground))',
					'c-primary': 'hsl(var(--sidebar-c-primary))',
					'c-primary-foreground': 'hsl(var(--sidebar-c-primary-foreground))',
					'c-accent': 'hsl(var(--sidebar-c-accent))',
					'c-accent-foreground': 'hsl(var(--sidebar-c-accent-foreground))',
					'c-border': 'hsl(var(--sidebar-c-border))',
					'c-ring': 'hsl(var(--sidebar-c-ring))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))',
					light: 'hsl(var(--success-light))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))',
					light: 'hsl(var(--warning-light))'
				},
				info: {
					DEFAULT: 'hsl(var(--info))',
					foreground: 'hsl(var(--info-foreground))',
					light: 'hsl(var(--info-light))'
				},
				earnings: {
					DEFAULT: 'hsl(var(--earnings))',
					foreground: 'hsl(var(--earnings-foreground))'
				},	
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))',
					blue: 'hsl(var(--card-blue))',
					green: 'hsl(var(--card-green))',
					purple: 'hsl(var(--card-purple))',
					orange: 'hsl(var(--card-orange))',
					'accent-c': 'hsl(var(--card-accent-c))'
				},
			},
			borderRadius: {
				lg: '12px',
				md: '8px',
				sm: '4px'
			},
			spacing: {
				// '8': '8px',
				'responsive': 'clamp(1rem, 2vw, 2rem)',
				'responsive-sm': 'clamp(0.5rem, 1vw, 1rem)',
				'responsive-lg': 'clamp(1.5rem, 3vw, 3rem)',
				'2': '8px',
				'3': '12px',
				'4': '16px',
				'6': '24px',
				'8': '32px',
				'12': '48px',
				'16': '64px',
				'20': '80px',
				'24': '96px'
			},
			fontSize: {
				'responsive': 'clamp(0.875rem, 1.5vw, 1rem)',
				'responsive-sm': 'clamp(0.75rem, 1.2vw, 0.875rem)',
				'responsive-lg': 'clamp(1rem, 2vw, 1.25rem)',
				'responsive-xl': 'clamp(1.25rem, 3vw, 2rem)',
			},
			maxWidth: {
				'responsive': 'min(100%, 1200px)',
				'responsive-sm': 'min(100%, 800px)',
				'responsive-lg': 'min(100%, 1600px)',
			},
			minWidth: {
				'0': '0',
				'responsive': 'min(200px, 100%)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': {
						opacity: '0',
						transform: 'translateY(10px)'
					},
					'100%': {
						opacity: '1',
						transform: 'translateY(0)'
					}
				},
				'scale-in': {
					'0%': {
						transform: 'scale(0.95)',
						opacity: '0'
					},
					'100%': {
						transform: 'scale(1)',
						opacity: '1'
					}
				},
				'slide-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'pulse-glow': {
					'0%, 100%': {
						opacity: '1'
					},
					'50%': {
						opacity: '0.7'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-out',
				'scale-in': 'scale-in 0.2s ease-out',
				'slide-up': 'slide-up 0.4s ease-out',
				'pulse-glow': 'pulse-glow 2s ease-in-out infinite'
			},
			screens: {
				'xs': '475px',
				'3xl': '1920px',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
