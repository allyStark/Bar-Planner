let { Grid, Row, Col, Button, Form } = ReactBootstrap;

class FormTest extends React.Component {

    render() {

        return (
         
            <form method="post" action="/test">

                <div className="form-group">
                    <label>Name</label>
                    <input type="text" className="form-control" placeholder="name" name="name" />
                </div>

                <div className="form-group">
                    <label>Password</label>
                    <input type="text" className="form-control" placeholder="Password" name="password" />
                </div>

                <div className="form-group">
                    <label>Confirm Password</label>
                    <input type="text" className="form-control" placeholder="Confirm Password" name="confirmpassword" />
                </div>

                <Button type="submit" className="btn btn-default">Submit</Button>      

            </form>

        )
    }
}

ReactDOM.render(<FormTest />, document.getElementById("main"));

