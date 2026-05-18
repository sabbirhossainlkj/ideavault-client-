import IdeaCard from '@/components/IdeaCard';
import React from 'react';

const IdeaPage = async() => {
    const res = await fetch('http://localhost:5000/idea')
    const ideas = await res.json()
    console.log(ideas) 
    return (
        <div className='my-4 w-10/12 mx-auto'>
            <h2 className='text-2xl font-bold text-center my-2'>All idea</h2>
            <div className='grid grid-cols-3 gap-3'>
                {
                    ideas.map(idea => (
                        <IdeaCard key={idea._id} idea={idea}></IdeaCard>
                    ))
                }
            </div>
        </div>
    );
};

export default IdeaPage;