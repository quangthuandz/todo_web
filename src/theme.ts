import { extendTheme } from '@chakra-ui/react'

const theme = extendTheme({
  fontSizes: {
    lg: '1.125rem',
    base: '1rem',
    sm: '0.875rem',
  },
  colors: {
    primary: '#1A86EF',
    light: {
      100: '#F8F8F8',
    },
    gray: {
      100: '#fafafa',
      200: '#f7f7f7',
    }
  },
})


export default theme
