import { useState } from "react"

 const useForm = (initialState: any) => {
    const [state, setState] = useState(initialState);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { dataset, name, value } = e.target;
        
        setState(state => ({
          ...state,
          ...( dataset.id ? {
            [dataset.id] : {
                ...state[dataset.id],
                [name] : value
            }
          } : {
            [name]: value
          }
        )

        }) );
    }

    return [ 
        state,
        handleChange,
        setState
    ];
} 

export default useForm