import { useState, useEffect } from 'react';
import ReactSelect from 'react-select';
import { apiClient } from "../../helpers/requestHelpers";
import { handleResp } from "../../helpers/responseHelpers";

export default function Select(props) {

  const { optionsUrl, ...rest } = props;
  const [loading, setLoading] = useState(false);
  const [options, setOptions] = useState([]);

  const getOptions = async() => {
    setLoading(true);
    const resp = await apiClient.post(optionsUrl);
    handleResp(resp, data => {
      setOptions(data.options);
      setLoading(false);
    });
  }

  useEffect(() => {
    getOptions();
  }, [optionsUrl]);

  return(
    <ReactSelect isDisabled={loading} options={options} {...rest}/>
  );
}
