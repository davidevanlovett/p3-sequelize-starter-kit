import {useEffect} from 'react';
import axios from 'axios';

const Posts = function () {
    useEffect(async () => {
        const posts = await axios.get('/api/posts');
        console.log(posts);        
    });
    return (
        <div></div>
    );
};

export default Posts;