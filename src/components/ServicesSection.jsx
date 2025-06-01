import React, { useState, useEffect } from "react";
import { supabase } from "../supabaseClient";
import Examples from './Examples';
import ExampleImages from "./ExampleImages";
import ImageCarousel from "./ImageCarousel";

export default function ServicesSection() {

    function UpperFirstLetter(word) {
        return word.charAt(0).toUpperCase() + word.slice(1)
    }
    const [allServices, setAllServices] = useState([]);

    useEffect(() => {
        async function fetchServices() {
            const { data, error } = await supabase
                .from("services")
                .select("*");

            console.log("Fetched services:", data);

            if (error) {
                console.error(error);
                return;
            }

            setAllServices(data);
        }

        fetchServices();
    }, []);

    const servicesByType = {};
    allServices.forEach(service => {
        if (!servicesByType[service.type]) {
            servicesByType[service.type] = [];
        }
        servicesByType[service.type].push(service);
    });

    const serviceTypes = ["makeup", "lashes"];

    return (
        <section id="services" >
            <div className="section-body">
                <a href='#services'><h1 data-aos="fade-right" >Services</h1></a>
                <div className='responsive-content' style={{ width: "90%" }}>
                    {serviceTypes.map(type => (
                        servicesByType[type] && (
                            <div key={type} className="text-column box-shadow" data-aos="fade-right">
                                <h2>{UpperFirstLetter(type)}</h2>
                                <ul className="services-list">
                                    {servicesByType[type].map(service => (
                                        <li key={service.id}>{UpperFirstLetter(service.name)} - £{service.price}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
                {/* <Examples />
                <ExampleImages /> */}
            </div>
            <ImageCarousel />
        </section>
    );
}
