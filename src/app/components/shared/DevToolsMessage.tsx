'use client';

import { useEffect, useRef } from 'react';

// Constants for consistent styling and configuration
const CONSOLE_STYLES = {
  header: [
    'background: #f5f6fa',
    'color: #222',
    'padding: 12px 20px',
    'border-radius: 8px',
    'font-size: 16px',
    'font-weight: 600',
    'font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  ].join(';'),
  humor: [
    'color: #222',
    'font-size: 14px',
    'font-weight: 500',
    'padding: 6px 12px',
    'font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  ].join(';'),
  tip: [
    'color: #555',
    'background: #fff9c4', // light yellow, post-it style
    'font-size: 12px',
    'border-radius: 6px',
    'padding: 6px 12px',
    'font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif',
  ].join(';'),
};

const infoStyle =
  'background: #f5f6fa; color: #222; padding: 10px 18px; border-radius: 8px; font-size: 14px; font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; margin-bottom: 6px; font-weight: 500;';
const gradientStyle =
  'background: linear-gradient(90deg, #f5d06f 0%, #f7cac9 100%); color: #222; padding: 10px 18px; border-radius: 8px; font-size: 15px; font-family: "SF Pro Display", -apple-system, BlinkMacSystemFont, "Segoe UI", system-ui, sans-serif; font-weight: 600; margin-top: 8px;';

const WORK_HUMOR = [
  'Got banned on Tinder? Sorry, I no longer work there! 📱💔🚫',
  'Looking for Yahoo Weather updates? Those days are behind me! ☀️📰🌦️',
  'Want to find Kindred invite code? Use referral code ROD.HSI1! 🚀💎✨',
  "Inspecting my code? Hope it's cleaner than my old Yahoo codebase! 🔍💻🧹",
];

// Utility function to create unique animation names
const createUniqueAnimNames = (baseNames: string[]) => {
  const timestamp = Date.now();
  return baseNames.reduce((acc, name) => {
    acc[name] = `${name}-${timestamp}`;
    return acc;
  }, {} as Record<string, string>);
};

// Custom hook for dev tools detection
const useDevToolsDetection = (threshold = 160) => {
  const devtoolsOpenRef = useRef(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const detectDevTools = () => {
      const widthThreshold = window.outerWidth - window.innerWidth > threshold;
      const heightThreshold =
        window.outerHeight - window.innerHeight > threshold;
      return widthThreshold || heightThreshold;
    };

    const handleDetection = () => {
      const isOpen = detectDevTools();

      if (isOpen && !devtoolsOpenRef.current) {
        devtoolsOpenRef.current = true;
        return true;
      } else if (!isOpen && devtoolsOpenRef.current) {
        devtoolsOpenRef.current = false;
      }

      return false;
    };

    const resizeHandler = () => {
      if (handleDetection()) {
        window.dispatchEvent(new CustomEvent('devtools-opened'));
      }
    };

    // Clear any existing interval first
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    const newInterval = setInterval(() => {
      if (handleDetection()) {
        window.dispatchEvent(new CustomEvent('devtools-opened'));
      }
    }, 1000);

    intervalRef.current = newInterval;
    window.addEventListener('resize', resizeHandler);

    return () => {
      if (newInterval) {
        clearInterval(newInterval);
        intervalRef.current = null;
      }
      window.removeEventListener('resize', resizeHandler);
    };
  }, [threshold]);
};

// Custom hook for console welcome messages
const useConsoleWelcome = () => {
  const handlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const handleDevToolsOpen = () => {
      setTimeout(() => {
        console.clear();

        const randomHumor =
          WORK_HUMOR[Math.floor(Math.random() * WORK_HUMOR.length)];

        console.log('%c🚀 DEVELOPER DETECTED! 🕵️‍♂️💻✨', CONSOLE_STYLES.header);
        console.log('\n');
        console.log('%c' + randomHumor, CONSOLE_STYLES.humor);
        console.log(
          '%c💡 Try typing "dance()", "disco()", or "music()" for some fun animations! 🎭🎪🎵',
          CONSOLE_STYLES.tip
        );
      }, 1200);
    };

    const currentHandler = handleDevToolsOpen;
    handlerRef.current = currentHandler;
    window.addEventListener('devtools-opened', currentHandler);

    return () => {
      if (currentHandler) {
        window.removeEventListener('devtools-opened', currentHandler);
        handlerRef.current = null;
      }
    };
  }, []);
};

// Generic hook for dev tools functions
const useDevToolsFunction = (
  functionName: string,
  functionImplementation: () => void
) => {
  const initializedRef = useRef(false);
  const handlerRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    const initializeFunction = () => {
      if (initializedRef.current) return;
      initializedRef.current = true;

      (window as unknown as Record<string, () => void>)[functionName] =
        functionImplementation;
    };

    // Capture values for cleanup
    const currentHandler = initializeFunction;
    const wasInitialized = initializedRef.current;

    handlerRef.current = currentHandler;
    window.addEventListener('devtools-opened', currentHandler);

    return () => {
      if (currentHandler) {
        window.removeEventListener('devtools-opened', currentHandler);
        handlerRef.current = null;
      }
      if (wasInitialized) {
        delete (window as unknown as Record<string, () => void>)[functionName];
        initializedRef.current = false;
      }
    };
  }, [functionName, functionImplementation]);
};

// Custom hook for dance function
const useDanceFunction = () => {
  const danceRunningRef = useRef(false);

  const danceImplementation = () => {
    if (danceRunningRef.current) {
      console.log(
        '%c🕺 Dance party! Multiple dancers welcome! 💃🎉',
        'background: #e67e22; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px;'
      );
      return;
    }

    danceRunningRef.current = true;

    const anims = createUniqueAnimNames(['dance', 'float']);

    const svg = `
    <svg width="200" height="100" xmlns="http://www.w3.org/2000/svg">
      <style>
        .dance-text { 
          font-family: Arial, sans-serif; 
          font-size: 16px; 
          font-weight: bold; 
          fill: #ff6b6b;
        }
        .dancer { 
          transform-origin: 100px 60px;
          animation: ${anims.dance} 0.5s ease-in-out 4 alternate;
        }
        @keyframes ${anims.dance} {
          0% { transform: rotate(-5deg) scale(1); }
          100% { transform: rotate(5deg) scale(1.1); }
        }
        .note {
          animation: ${anims.float} 0.5s ease-in-out 4 alternate;
        }
        @keyframes ${anims.float} {
          0% { transform: translateY(0px); }
          100% { transform: translateY(-10px); }
        }
      </style>
      
      <!-- Background -->
      <rect width="200" height="100" fill="#f0f8ff" fill-opacity="0.7" rx="10"/>
      
      <!-- Dancing figure -->
      <g class="dancer">
        <!-- Head -->
        <circle cx="100" cy="30" r="8" fill="#ffdbac"/>
        <!-- Body -->
        <line x1="100" y1="38" x2="100" y2="65" stroke="#333" stroke-width="3"/>
        <!-- Arms -->
        <line x1="100" y1="45" x2="85" y2="35" stroke="#333" stroke-width="2"/>
        <line x1="100" y1="45" x2="115" y2="55" stroke="#333" stroke-width="2"/>
        <!-- Legs -->
        <line x1="100" y1="65" x2="90" y2="80" stroke="#333" stroke-width="2"/>
        <line x1="100" y1="65" x2="110" y2="80" stroke="#333" stroke-width="2"/>
      </g>
      
      <!-- Musical notes -->
      <circle cx="30" cy="30" r="3" class="note" fill="#ff6b6b"/>
      <circle cx="170" cy="40" r="2" class="note" fill="#4ecdc4"/>
      
      <!-- Text -->
      <text x="100" y="95" text-anchor="middle" class="dance-text">DANCE TIME!</text>
    </svg>`
      .replace(/\s+/g, ' ')
      .trim();

    console.log(
      '%c ',
      `
      color: transparent;
      font-size: 1px;
      background: url("data:image/svg+xml,${encodeURIComponent(
        svg
      )}") no-repeat;
      background-size: contain;
      padding: 50px 100px;
      margin: 10px;
    `
    );

    setTimeout(() => {
      danceRunningRef.current = false;
      console.log(
        '%c🎤 Hip-Hop Culture: Born in the 1970s Bronx from Black and Latino communities, hip-hop encompasses 5 elements: DJing, MCing (rap), break dancing, graffiti art, and knowledge. It transformed global culture and gave voice to communities worldwide! 🌍',
        infoStyle
      );
      console.log(
        '%c🎧 Hip-Hop Legends: DJ Kool Herc (Father of Hip-Hop), Afrika Bambaataa (Universal Zulu Nation), Grandmaster Flash (Turntable Pioneer), DJ Premier, Pete Rock, J Dilla, Marley Marl 🔥',
        'padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 300;'
      );
      console.log(
        '%c📺 Watch: "Hip-Hop Evolution" (Netflix) | "The Get Down" | "Fresh Dressed" | "Something From Nothing: The Art of Rap"',
        'padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 300;'
      );
      console.log('%c🎉 Keep grooving! 🎉', gradientStyle);
    }, 2000);
  };

  useDevToolsFunction('dance', danceImplementation);
};

// Custom hook for disco function
const useDiscoFunction = () => {
  const discoRunningRef = useRef(false);

  const discoImplementation = () => {
    if (discoRunningRef.current) {
      console.log(
        '%c🪩 Disco fever spreading! More dancers! ✨🕺💃',
        'background: #8e44ad; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px;'
      );
      return;
    }

    discoRunningRef.current = true;

    const anims = createUniqueAnimNames(['spin', 'flash']);

    const discoSvg = `
    <svg width="300" height="150" xmlns="http://www.w3.org/2000/svg">
      <style>
        .disco-text { 
          font-family: 'Courier New', monospace; 
          font-size: 20px; 
          font-weight: bold; 
          fill: #fff;
          text-anchor: middle;
        }
        .disco-ball { 
          transform-origin: 150px 40px;
          animation: ${anims.spin} 1s linear 4;
        }
        @keyframes ${anims.spin} {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .beam {
          animation: ${anims.flash} 0.5s ease-in-out 8 alternate;
        }
        @keyframes ${anims.flash} {
          0% { opacity: 0.3; }
          100% { opacity: 1; }
        }
      </style>
      
      <!-- Dark background -->
      <rect width="300" height="150" fill="#1a1a1a" fill-opacity="0.8"/>
      
      <!-- Light beams -->
      <polygon points="150,40 50,120 250,120" class="beam" fill="#ff6b6b" opacity="0.3"/>
      <polygon points="150,40 80,120 220,120" class="beam" fill="#4ecdc4" opacity="0.4"/>
      <polygon points="150,40 110,120 190,120" class="beam" fill="#f9ca24" opacity="0.5"/>
      
      <!-- Disco ball -->
      <g class="disco-ball">
        <circle cx="150" cy="40" r="15" fill="#c0c0c0"/>
        <!-- Grid pattern -->
        <path d="M135,40 L165,40 M150,25 L150,55 M140,30 L160,50 M160,30 L140,50" stroke="#fff" stroke-width="1" opacity="0.7"/>
      </g>
      
      <!-- Sparkles -->
      <polygon points="50,60 52,66 58,66 53,70 55,76 50,72 45,76 47,70 42,66 48,66" fill="#fff" opacity="0.8">
        <animate attributeName="opacity" values="0;1;0" dur="0.8s" repeatCount="5"/>
      </polygon>
      <polygon points="250,80 252,86 258,86 253,90 255,96 250,92 245,96 247,90 242,86 248,86" fill="#fff" opacity="0.8">
        <animate attributeName="opacity" values="1;0;1" dur="0.6s" repeatCount="6"/>
      </polygon>
      
      <!-- Text -->
      <text x="150" y="135" class="disco-text">DISCO FEVER!</text>
    </svg>`
      .replace(/\s+/g, ' ')
      .trim();

    console.log(
      '%c ',
      `
      color: transparent;
      font-size: 1px;
      background: url("data:image/svg+xml,${encodeURIComponent(
        discoSvg
      )}") no-repeat;
      background-size: contain;
      padding: 75px 150px;
      margin: 10px;
    `
    );

    setTimeout(() => {
      discoRunningRef.current = false;
      console.log(
        '%c🏳️‍🌈 Disco History: Born in the 1970s, disco became a sanctuary for LGBTQ+ communities, especially in NYC. It broke barriers, celebrated diversity, and gave marginalized voices a place to shine under the mirror ball! ✨',
        infoStyle
      );
      console.log(
        '%c🕺 Disco Legends: Giorgio Moroder (Father of Electronic Dance), Nile Rodgers (Chic), Donna Summer, Bee Gees, Diana Ross, KC & The Sunshine Band, Village People 💃',
        'padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 300;'
      );
      console.log(
        '%c📺 Watch: "The Disco Years" | "54: The Director\'s Cut" | "Can You Dig This" | YouTube: "The Rise and Fall of Disco" https://www.youtube.com/watch?v=h6i-em3Le50',
        'padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 300;'
      );
      console.log("%c✨ Stayin' Alive! ✨", gradientStyle);
    }, 4000);
  };

  useDevToolsFunction('disco', discoImplementation);
};

// Custom hook for turntable music function
const useMusicFunction = () => {
  const musicRunningRef = useRef(false);

  const musicImplementation = () => {
    if (musicRunningRef.current) {
      console.log(
        '%c🎵 Turntables spinning! DJ in the house! 🎧🔥',
        'background: #d35400; color: #fff; padding: 4px 8px; border-radius: 4px; font-size: 12px;'
      );
      return;
    }

    musicRunningRef.current = true;

    const anims = createUniqueAnimNames(['spin', 'wobble', 'pulse']);

    const musicSvg = `
    <svg width="350" height="200" xmlns="http://www.w3.org/2000/svg">
      <style>
        .music-text { 
          font-family: 'Courier New', monospace; 
          font-size: 18px; 
          font-weight: bold; 
          fill: #2d3436;
          text-anchor: middle;
        }
        .turntable { 
          transform-origin: 175px 100px;
          animation: ${anims.spin} 0.8s linear 2;
        }
        .needle { 
          transform-origin: 200px 80px;
          animation: ${anims.wobble} 0.4s ease-in-out 4 alternate;
        }
        @keyframes ${anims.spin} {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes ${anims.wobble} {
          0% { transform: rotate(-2deg); }
          100% { transform: rotate(2deg); }
        }
        .sound-wave {
          animation: ${anims.pulse} 0.3s ease-in-out 5 alternate;
        }
        @keyframes ${anims.pulse} {
          0% { opacity: 0.3; transform: scale(1); }
          100% { opacity: 1; transform: scale(1.2); }
        }
      </style>
      
      <!-- Background -->
      <rect width="350" height="200" fill="#ddd" fill-opacity="0.6" rx="15"/>
      
      <!-- Turntable base -->
      <circle cx="175" cy="100" r="60" fill="#2d3436" stroke="#636e72" stroke-width="3"/>
      
      <!-- Vinyl record -->
      <g class="turntable">
        <circle cx="175" cy="100" r="50" fill="#2d3436"/>
        <circle cx="175" cy="100" r="45" fill="#636e72"/>
        <circle cx="175" cy="100" r="35" fill="#2d3436"/>
        <circle cx="175" cy="100" r="25" fill="#636e72"/>
        <circle cx="175" cy="100" r="15" fill="#2d3436"/>
        <circle cx="175" cy="100" r="3" fill="#ddd"/>
        <!-- Record lines -->
        <circle cx="175" cy="100" r="40" fill="none" stroke="#2d3436" stroke-width="1" opacity="0.5"/>
        <circle cx="175" cy="100" r="30" fill="none" stroke="#2d3436" stroke-width="1" opacity="0.5"/>
        <circle cx="175" cy="100" r="20" fill="none" stroke="#2d3436" stroke-width="1" opacity="0.5"/>
      </g>
      
      <!-- Needle arm -->
      <g class="needle">
        <line x1="200" y1="80" x2="160" y2="110" stroke="#74b9ff" stroke-width="3" stroke-linecap="round"/>
        <circle cx="200" cy="80" r="4" fill="#74b9ff"/>
        <circle cx="160" cy="110" r="2" fill="#e17055"/>
      </g>
      
      <!-- Sound waves -->
      <g class="sound-wave">
        <path d="M280 90 Q290 100 280 110" fill="none" stroke="#00cec9" stroke-width="2"/>
        <path d="M290 85 Q305 100 290 115" fill="none" stroke="#00cec9" stroke-width="2"/>
        <path d="M300 80 Q320 100 300 120" fill="none" stroke="#00cec9" stroke-width="2"/>
      </g>
      
      <!-- Musical notes floating -->
      <circle cx="50" cy="50" r="2" class="sound-wave" fill="#e17055"/>
      <circle cx="300" cy="60" r="1.5" class="sound-wave" fill="#74b9ff"/>
      <circle cx="80" cy="170" r="2.5" class="sound-wave" fill="#00cec9"/>
      
      <!-- Text -->
      <text x="175" y="180" class="music-text">DJ TURNTABLES SPINNING!</text>
    </svg>`
      .replace(/\s+/g, ' ')
      .trim();

    console.log(
      '%c ',
      `
      color: transparent;
      font-size: 1px;
      background: url("data:image/svg+xml,${encodeURIComponent(
        musicSvg
      )}") no-repeat;
      background-size: contain;
      padding: 100px 175px;
      margin: 10px;
    `
    );

    setTimeout(() => {
      musicRunningRef.current = false;
      console.log(
        '%c🏠 House Music History: Born in 1980s Chicago, house music emerged from Black and Latino LGBTQ+ clubs like The Warehouse. DJs like Frankie Knuckles created this revolutionary sound that united dance floors worldwide! 🎶',
        infoStyle
      );
      console.log(
        '%c🎶 House Legends: Frankie Knuckles (Godfather of House), Larry Levan, Ron Hardy, Marshall Jefferson, Derrick Carter, Carl Cox, David Guetta, Daft Punk 🔥',
        'padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 300;'
      );
      console.log(
        '%c📺 Watch: "Pump Up The Volume" | "Paris Is Burning" | "24 Hour Party People" | YouTube: "Check Your Body at the Door" https://www.youtube.com/watch?v=xWBoXrHRhmA',
        'padding: 4px 8px; border-radius: 4px; font-size: 11px; font-weight: 300;'
      );
      console.log('%c🎵 Drop that beat! 🎧', gradientStyle);
    }, 1600);
  };

  useDevToolsFunction('music', musicImplementation);
};

const DevToolsMessage = () => {
  useDevToolsDetection(160);
  useConsoleWelcome();
  useDanceFunction();
  useDiscoFunction();
  useMusicFunction();

  return null;
};

export default DevToolsMessage;
