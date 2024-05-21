CREATE OR REPLACE PROCEDURE clean_plate_club.recipe_update
(
	p_id		uuid,
	p_name		text,
	p_cuisine	text,
	p_time		text,
	p_protein	text,
	p_cooking_type	text,
	p_source		jsonb
) 
AS $$
BEGIN

	-- parameter validation
	if p_id is NULL then
		RAISE EXCEPTION 'id must have a value';
	end if;
	
	if p_name is NULL then
		RAISE EXCEPTION 'name must have a value';
	end if;
	
	if p_cuisine is NULL then
		RAISE EXCEPTION 'cuisine must have a value';
	end if;

	if p_time is NULL then
		RAISE EXCEPTION 'time must have a value';
	end if;

	if p_protein is NULL then
		RAISE EXCEPTION 'protein must have a value';
	end if;

	if p_cooking_type is NULL then
		RAISE EXCEPTION 'cooking type must have a value';
	end if;

	if p_source is NULL then
		RAISE EXCEPTION 'source must have a value';
	end if;

	update clean_plate_club.recipes
		set id = p_id, name = p_name, cuisine = p_cuisine, time = p_time, protein = p_protein, cooking_type = p_cooking_type
		where id = p_id;
		
	if p_source->'link' is NULL then
		update clean_plate_club.books
		set recipe_id = p_id, title = p_source->>'title', author = p_source->>'author', cover_image = p_source->>'cover_image', page = (p_source->'page')::int
		where recipe_id = p_id;
	else
		update clean_plate_club.media
		set recipe_id = p_id, media = p_source->>'link', image = p_source->>'image'
		where recipe_id = p_id;
	end if;
	
END;
$$ LANGUAGE plpgsql;