import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Image from 'next/image';
import logo from './../public/logo.png';

// icons
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import School from '@mui/icons-material/School';
import Apartament from '@mui/icons-material/Apartment';
import Groups from '@mui/icons-material/Groups';
import TouchApp from '@mui/icons-material/TouchApp';
import QuizIcon from '@mui/icons-material/Quiz';
import HomeIcon from '@mui/icons-material/Home';

const drawerWidth = 260;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  borderTop: '6px solid #1A4287',
}));

export default function PersistentDrawerLeft({ children }) {
  const router = useRouter();

  const theme = useTheme();
  const [open, setOpen] = React.useState(true);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const activeLink = (link) => {
    return router.pathname.startsWith(link)
  }

  const apps = [
    {
      icon: <HomeIcon />,
      text: 'Dashboard',
      link: '/home'
    },
    {
      icon: <Apartament />,
      text: 'Escolas',
      link: '/escolas'
    },
    {
      icon: <Groups />,
      text: 'Usuários',
      link: '/usuarios'
    },
    {
      icon: <TouchApp />,
      text: 'Cursos',
      link: '/cursos'
    },
    {
      icon: <QuizIcon />,
      text: 'Avaliações',
      link: '/avaliacoes'
    }
  ];

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar style={{borderTop: '6px solid #1A4287'}} className="appBar"
        elevation={0}
        position="fixed"
        open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
          >
            <MenuIcon />
          </IconButton>
          {!open && (
            <>
              <Image src={logo} />
            </>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{display: 'flex', justifyContent: 'space-between', paddingLeft: 50 }}>
          <Image src={logo} />
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <List style={{
          paddingLeft: 8,
          paddingRight: 8,
          paddingTop: 20
        }}>
        {apps.map(({icon, text, link}) => (
          <ListItem
            style={activeLink(link) ? {
              background: '#1B458D',
              color: '#FFF',
              marginBottom: 6,
              borderRadius: '6px'
            } : {marginBottom: 6}}
            key={text}
            disablePadding>
            <ListItemButton>
              <ListItemIcon
                style={activeLink(link) ? {color: '#FFF'} : {color: '#1B458D'}}>
                {icon}
              </ListItemIcon>
              <Link href={{pathname: link}}>
                <ListItemText
                    style={activeLink(link) ? {color: '#FFF'} : {color: '#323232'}}
                    primary={text} />
              </Link>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {children}
      </Main>
    </Box>
  );
}
