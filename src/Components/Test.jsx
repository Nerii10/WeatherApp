export default function TEST(Data) {
    return(
        <>
        <h1>DATA</h1>
             <pre>{JSON.stringify(Data, null, 4)}</pre>
        </>
    )
}