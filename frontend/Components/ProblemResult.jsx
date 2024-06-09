import React from 'react'
import '@/Styles/analytics.css'
import Goal from '@/public/goalLogo.svg'
import Route from '@/public/routeLogo.svg'
import Image from 'next/image'

const ProblemResult = ({problem}) => {

    const routes = problem.output?.routes === undefined ? [] : problem.output.routes;


  return (
    <main className='problem_result_container'>
       {problem.output && !problem.output.status
        ?   <>
                <div className='problem_result_objectives'>
                    <div>
                        <Image alt='route logo' width={60} height={60} src={Route}/>
                        <h2>Max Route Distance:  {problem.output?.maxRouteDistance}</h2>
                    </div>
                    <div>
                        <Image alt='objectivelogo' width={60} height={60} src={Goal}/>
                        <h2>Objective: {problem.output?.objective}</h2>
                    </div>
                </div>
                <ul className='vehicles_list'>
                    {routes.map((route) => {
                        return(
                            <li key={route.vehicle}>
                                <h3>Vehicle: {route.vehicle}</h3>
                                <div>
                                    <p>Distance: {route.distance}</p>
                                    <p>Stops: </p>
                                    <ul className='stops_list'>
                                        {
                                            route.stops?.map((stop, index) => {
                                                return(
                                                    <li key={index}>
                                                        <p>{stop} {index < route.stops.length - 1 && '-->' }</p>
                                                    </li>
                                                )
                                            })
                                        }
                                    </ul>
                                </div>
                            </li>
                        )
                    })

                    }
                </ul>
            </>
        :   <h3>{problem.output?.status}</h3>
        }
    </main>
  )
}

export default ProblemResult