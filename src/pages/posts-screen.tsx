import { IonContent, IonPage, IonList, IonItem, withIonLifeCycle } from '@ionic/react';
import React from 'react';

export interface IPostsScreenProps {
}

export interface IPostsScreenState {
    //
    // Some state to demonstrate issue.
    //
    someState: string;
}

let nid = 1;

class PostsScreen extends React.Component<IPostsScreenProps, IPostsScreenState> {

    //
    // Set to true while the React component for the screen is mounted.
    //
    _ismounted: boolean = false;

    //
    // ID assigned to the component just for debugging.
    //
    _id: number = nid++;

    constructor(props: IPostsScreenProps) {
        super(props);

        console.log("constructor for #" + this._id);

        this.state = {
            someState: "Initial state",
        };
    }

    componentDidMount() { 
        this._ismounted = true;
        console.log("componentDidMount for #" + this._id);
    }
      
    componentWillUnmount() {
        this._ismounted = false;
        console.log("componentWillUnmount: " + this._id);
    }    

    ionViewWillEnter() {
        console.log('ionViewWillEnter event fired for #' + this._id);
        console.log(`isMounted: ${this._ismounted}`);
    }
    
    ionViewDidEnter() {
        console.log('ionViewDidEnter event fired for #' + this._id);
        console.log(`isMounted: ${this._ismounted}`);

        this.setState({ // THIS FAILS WHEN NAVIGATING TO ANOTHER PAGE.
            someState: "trigger a state change to demonstrate an issue",
        });
    }
    
    render() {
        return (
            <IonPage>
                <IonContent>
                    <IonList>
                        <IonItem
                            routerLink="/posts/scheduled"
                            detail={false}
                            >
                            Cilck me to trigger the problem
                        </IonItem>

                    </IonList>
                </IonContent>
            </IonPage>
        );
    }
}

export default withIonLifeCycle(PostsScreen);