//This is where state goes
import {createContext, useState, useEffect} from 'react'

const FeedbackContext = createContext()

export const FeedbackProvider = ({children}) => {
    //State
    const [feedback, setFeedback] = useState([

    ])
    const [feedbackEdit, setFeedbackEdit] = useState({
        item: {},
        edit: false
    })
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        fetchFeedback()
    }, [])

    //Fetch Feedback -- Getting Feedback from JSON Server
    const fetchFeedback = async () => {
        const response = await fetch(`/feedback?_sort=id&_order=desc`)
        const data = await response.json()

        setFeedback(data)
        setIsLoading(false)
    }
    //Set Item to be updated
    const editFeedback = (item) => {
        setFeedbackEdit({
            item,
            edit:true
        })
    }
    //Delete Feedback
    const deleteFeedback = async (id) => {
        if(window.confirm('Are you sure you want to delete')) {
            await fetch(`/feedback/${id}`, {method: 'DELETE'} )

            setFeedback(feedback.filter((item) => item.id !== id))
        }
    }
    //Add Feedback
    const addFeedback = async (newFeedback) => {
        const resposne = await fetch('/feedback', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body:JSON.stringify(newFeedback)
        })

        const data = await resposne.json()

        setFeedback([data, ...feedback])
    }
    //Update Feedback Item
    const updateFeedback = async (id, updItem) => {
        const response = await fetch(`/feedback/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(updItem)
        })

        const data = await response.json()

        setFeedback(feedback.map((item) => item.id === id ? {... item, ...data} : item))
    }
    return <FeedbackContext.Provider value={{
        feedback,
        feedbackEdit, ///Actual Item to Edit
        isLoading,
        deleteFeedback,
        addFeedback,
        editFeedback, //This is the function
        updateFeedback, //Updates Feedback

    }}>
        {children}
    </FeedbackContext.Provider>
}


export default FeedbackContext