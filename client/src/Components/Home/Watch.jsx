/* eslint-disable */
import { React, useEffect } from 'react';
import { logOutUser, loadUserData } from '../../Redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import NavBarPlayer from '../NavBarPlayer/NavBarPlayer.jsx';
import { useToast } from '@chakra-ui/react';

export default function Watch() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const myMovie = useSelector((state) => state.movieDetail);
  const idTrailer = myMovie.trailer.slice(32);
  const user = useSelector((state) => state.user);
  const toast = useToast();

  const { id } = useParams();

  useEffect(() => {
    dispatch(loadUserData(user.uid));
  }, []);

  if (user && user.banned) {
    toast({
      title: 'You have been banned.',
      description:
        'For any complaint or further information please contact our crew.',
      status: 'error',
      duration: 5000,
      position: 'top-center',
      isClosable: true,
    });
    dispatch(logOutUser());
    navigate('/home');
  }
  
  return (
    <>
      <NavBarPlayer />
      <iframe
        height={'100%'}
        width={'100%'}
        src={`//www.youtube.com/embed/${idTrailer}?autoplay=1`}
        frameborder="0"
        allowFullScreen
        className="youtube"
        auto
        title="trailer"
      ></iframe>
    </>
  );
}
