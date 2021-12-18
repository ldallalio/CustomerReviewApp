import Card from "../components/shared/Card"
import {Link} from 'react-router-dom'

function AboutPage() {
    return (
        <Card>
            <div>
                 <h1>About This Project</h1>
                 <p>This is an awesome app to allow for customer reviews!</p>
                 <p>Version: 1.0.0</p>

                 <p>
                     <Link to="/">Back To Home</Link>
                 </p>
            </div>
        </Card>
        
    )
}

export default AboutPage
