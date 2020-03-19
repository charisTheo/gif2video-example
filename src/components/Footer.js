import React, { Component } from 'react'
import { secondary, primary } from '../theme';

// TODO: add hosting information, created by, created with

export default class Footer extends Component {
    render() {
        return (
            <footer style={{ backgroundColor: secondary[800], color: primary[300]}}>
                <h4>Footer</h4>
            </footer>
        )
    }
}
