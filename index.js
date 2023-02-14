ReactDOM.render(
    <StrictMode>
      <Provider store={store}> {/* HERE */}
        <App /> {/* Now, App is wrapped in Provider and hence can read from store */}
      </Provider>
    </StrictMode>,
    document.getElementById('root')
  )