import React, {useState, useEffect} from 'react'
import { getPosts, getThreePopular } from '../requests/api'
import { Carousel } from 'react-responsive-carousel';

export default function Banner() {
    const [popularPosts, setPopularPosts] = useState([])

    useEffect(() => {
        fetchData()
    }, [])

    const fetchData = async () => {
        try {
            const res2 = await getThreePopular()
            setPopularPosts(res2.data)
        } catch (error) {
            console.log('error 1 :>> ', error);
        }
    }

    return (
        <div>
            <Carousel autoPlay infiniteLoop showThumbs={false}>
                { popularPosts.map(each => {
                    return (
                    <React.Fragment key={each._id}>
                        <div style={{height: 500, width: '100%'}}>
                            <a href={`/blog/${each._id}`}>
                                <img src={each.image} className='img-fluid' alt="" 
                                    style={{height: 500, width: '100%'}} />
                                <h5 className='legend'>
                                    {each.title}
                                </h5>
                            </a>
                        </div>
                    </React.Fragment>
                )
                }) }
            </Carousel>
        </div>
    )
}
