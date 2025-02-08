import config from '../../components/config/config';

export default async function googleSignIn(setUserEmail) {
  try {
    console.log('Starting Google Sign-In process...');
    const redirectTo = window.location.origin;
    const { data, error } = await config.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    } else {
      const user = data?.user || (await config.supabaseClient.auth.getUser()).data.user;
      if (user) {
        setUserEmail(user.email); // Capture and set the user's email
      }
    }
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
}










