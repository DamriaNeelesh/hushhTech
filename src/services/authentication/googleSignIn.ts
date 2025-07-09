import resources from '../../resources/resources';

export default async function googleSignIn(callback?: () => void) {
  try {
    console.log('Starting Google Sign-In process...');
    // Redirect to auth callback which will handle registration check
    const redirectTo = window.location.origin + '/auth/callback';
    
    if (!resources.config.supabaseClient) {
      console.error('Supabase client is not initialized');
      return;
    }
    
    const { data, error } = await resources.config.supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo,
      },
    });

    if (error) {
      console.error('Error during Google Sign-In:', error.message);
    } else if (callback) {
      // Execute the callback if provided
      callback();
    }
  } catch (error) {
    console.error('Unexpected error during Google Sign-In:', error);
  }
}










