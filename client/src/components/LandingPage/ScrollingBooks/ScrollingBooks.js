import React from 'react'
import './ScrollingBooks.css'
import { Col } from 'react-bootstrap'

const ScrollingBooks = () => {
    const books = [{
        "_id": "62d60fdd1e24dae70386f9ca",
        "thumbnail": "http://books.google.com/books/content?id=B6kl7WGhRKkC&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d6113d1e24dae70386f9d0",
        "thumbnail": "http://books.google.com/books/content?id=CgeHW-geducC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611501e24dae70386f9d6",
        "thumbnail": "http://books.google.com/books/content?id=zSknpwAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d611921e24dae70386f9dc",
        "thumbnail": "http://books.google.com/books/content?id=17owDwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611a31e24dae70386f9e2",
        "thumbnail": "http://books.google.com/books/content?id=UzsMAAAAIAAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611b21e24dae70386f9e8",
        "thumbnail": "http://books.google.com/books/content?id=pgPWOaOctq8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611ca1e24dae70386f9ee",
        "thumbnail": "http://books.google.com/books/content?id=3IAUEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611e41e24dae70386f9f4",
        "thumbnail": "http://books.google.com/books/content?id=no6iEu4lWEgC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d611f71e24dae70386f9fa",
        "thumbnail": "http://books.google.com/books/content?id=UB74EoKvVfsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d612e11e24dae70386fa00",
        "thumbnail": "http://books.google.com/books/content?id=EPftAAAAMAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d612f21e24dae70386fa06",
        "thumbnail": "http://books.google.com/books/content?id=mfMJAQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613091e24dae70386fa0d",
        "thumbnail": "http://books.google.com/books/content?id=p_5l2FCfvF8C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613151e24dae70386fa13",
        "thumbnail": "http://books.google.com/books/content?id=utvB0I_0SZsC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613251e24dae70386fa19",
        "thumbnail": "http://books.google.com/books/content?id=z1k_AxXUvmEC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613401e24dae70386fa1f",
        "thumbnail": "http://books.google.com/books/content?id=nVGKDgAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613611e24dae70386fa25",
        "thumbnail": "http://books.google.com/books/content?id=b3ctQ5L7zNoC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6136f1e24dae70386fa2b",
        "thumbnail": "http://books.google.com/books/content?id=T5IhvgAACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d6137f1e24dae70386fa31",
        "thumbnail": "http://books.google.com/books/content?id=UU9UAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613b91e24dae70386fa37",
        "thumbnail": "http://books.google.com/books/content?id=mWHcDAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613c41e24dae70386fa3d",
        "thumbnail": "http://books.google.com/books/content?id=W4r7lF_MSMYC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613db1e24dae70386fa43",
        "thumbnail": "http://books.google.com/books/content?id=CzaeCifjTf4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613e71e24dae70386fa49",
        "thumbnail": "http://books.google.com/books/content?id=S_qN7V5CB6QC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d613f21e24dae70386fa4f",
        "thumbnail": "http://books.google.com/books/content?id=dZ1TngEACAAJ&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d6140e1e24dae70386fa55",
        "thumbnail": "http://books.google.com/books/content?id=HlVoAwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6141d1e24dae70386fa5b",
        "thumbnail": "http://books.google.com/books/content?id=_luMDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614281e24dae70386fa61",
        "thumbnail": "http://books.google.com/books/content?id=CV2ZQtY3G7kC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6143b1e24dae70386fa67",
        "thumbnail": "http://books.google.com/books/content?id=dM_-DwAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6145a1e24dae70386fa6e",
        "thumbnail": "http://books.google.com/books/content?id=bSW6uk_CzXUC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614631e24dae70386fa73",
        "thumbnail": "http://books.google.com/books/content?id=YpTA74jz018C&printsec=frontcover&img=1&zoom=1&source=gbs_api"
    },
    {
        "_id": "62d614721e24dae70386fa79",
        "thumbnail": "http://books.google.com/books/content?id=B1hSG45JCX4C&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614881e24dae70386fa7f",
        "thumbnail": "http://books.google.com/books/content?id=pO6mDQAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614911e24dae70386fa85",
        "thumbnail": "http://books.google.com/books/content?id=OPAgEAAAQBAJ&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614cd1e24dae70386fa8c",
        "thumbnail": "http://books.google.com/books/content?id=jUX8N9kiCiQC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d614d81e24dae70386fa92",
        "thumbnail": "http://books.google.com/books/content?id=uv4vqKYsyawC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d615021e24dae70386faa1",
        "thumbnail": "http://books.google.com/books/content?id=l4lxLsH2n3YC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    },
    {
        "_id": "62d6153f1e24dae70386faa8",
        "thumbnail": "http://books.google.com/books/content?id=f_0m7WiulUMC&printsec=frontcover&img=1&zoom=1&edge=curl&source=gbs_api"
    }
    ]


    return <div  className='animate-up-and-in'>

        <div className='LandingPage__books'>
            <img src={books[0].thumbnail} className='book-placeholder' />
            <div className='LandingPage__books__row-1'>
                {
                    books.map((book, i) => {
                        if (i < 4) return <img key={book._id + '1'} src={book?.thumbnail} className='book' />
                    })
                }
            </div>
            <div className='LandingPage__books__row-2'>
                {
                    books.map((book, i) => {
                        if (i < 8 && i > 3) return  <img key={book._id + '2'} src={book?.thumbnail} className='book' />
                    })
                }
            </div>
        </div>
        <div className='LandingPage__books'>
            <img src={books[0].thumbnail} className='book-placeholder' />
            <div className='LandingPage__books__row-3'>
                {
                    books.map((book, i) => {
                        if (i < 12 && i > 7) return  <img key={book._id + '3'} src={book?.thumbnail} className='book' />
                    })
                }
            </div>
            <div className='LandingPage__books__row-4'>
                {
                    books.map((book, i) => {
                        if (i < 16 && i > 11) return  <img key={book._id + '4'} src={book?.thumbnail} className='book' />
                    })
                }
            </div>
        </div>
    </div>
}

export default ScrollingBooks