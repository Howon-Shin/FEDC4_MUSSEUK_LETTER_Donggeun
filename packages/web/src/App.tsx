import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { authCheckOption } from '@/apis/queries/useAuthCheckQuery';
import SignIn from './pages/Signin';
import SignUp from './pages/Signup';
import MainLayout from './routes/layout';
import Main from './pages/Main';
import Profile from './pages/Profile';
import NewPost from './pages/Newpost';
import Post from './pages/Post';
import Search from './pages/Search';
import ChangePassword from './pages/ChangePassword';
import SettingSlack from './pages/Setting/Slack';
import NotFound from './pages/NotFound';
import SlackConfirmationWrapper from './pages/Setting/SlackConfirmation';

const App = () => {
  useQuery({ ...authCheckOption });

  return (
    <Router>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Main />} />
          <Route path="/post/:postId" element={<Post />} />
          <Route path="/newpost" element={<NewPost />} />
          <Route path="/profile/:userId" element={<Profile />} />
          <Route path="/search/:keyword" element={<Search />} />
          <Route path="/setting/slack" element={<SettingSlack />} />
          <Route path="/changePassword" element={<ChangePassword />} />
          <Route path="/setting/slack/confirmation" element={<SlackConfirmationWrapper />} />
        </Route>
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
};

export default App;
