tailwind.config = {
  theme: {
    fontFamily: {
    'gilroy':'gilroy',
    'RfDewi' : 'RfDewi',
    },
    screens:{
      xs: '480px',
      sm:'640px',
      md:'768px',
      lg:'1024px',
      xl:'1280px',
    },
    container: {
      padding: {
        DEFAULT: '20px',
        sm: '30px',
        lg: '1rem',
        xl: '0rem'
      },
      center: 'true',
    },
    extend: {
      colors: {
        light: "#F9F9F9",
        yellow: "#FFC200",
        dark: "#313131"
      },
    },
  },
};